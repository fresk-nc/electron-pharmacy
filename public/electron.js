/* eslint-disable @typescript-eslint/no-var-requires */
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const camelcaseKeys = require('camelcase-keys');
const snakecaseKeys = require('snakecase-keys');

let mainWindow;

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, './pharmacy.db'),
  },
});

function formatOrders(orders) {
  return Object.values(
    orders.reduce((output, order) => {
      output[order.id] = output[order.id] || {
        id: order.id,
        datetime: order.datetime,
        totalPrice: order.totalPrice,
        status: order.status,
        phone: order.phone,
        address: order.address,
        drugs: [],
      };
      output[order.id].drugs.push({
        name: order.name,
        count: order.count,
        price: order.price,
      });
      return output;
    }, {})
  );
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 680,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, './index.html')}`
  );
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', () => {
  createWindow();

  ipcMain.on('bootstrap', (event) => {
    Promise.all([
      knex
        .select()
        .from('orders')
        .innerJoin('order_item', 'orders.id', 'order_item.order_id')
        .then(camelcaseKeys)
        .then(formatOrders),
      knex.select().from('drugs').then(camelcaseKeys),
      knex.select().from('pickup_points').then(camelcaseKeys),
    ]).then(([orders, drugs, pickupPoints]) => {
      event.reply('bootstrap-success', {orders, drugs, pickupPoints});
    });
  });
  ipcMain.on('drugs-table-insert', (event, data) => {
    knex('drugs')
      .insert(snakecaseKeys(data))
      .then(() => {
        event.reply('drugs-table-insert-success');
      })
      .catch((error) => {
        console.log(error);
        event.reply('drugs-table-insert-failure');
      });
  });
  ipcMain.on('drugs-table-update', (event, {oldData, newData}) => {
    knex('drugs')
      .where({name: oldData.name})
      .update(snakecaseKeys(newData))
      .then(() => {
        event.reply('drugs-table-update-success');
      })
      .catch((error) => {
        console.log(error);
        event.reply('drugs-table-update-failure');
      });
  });
  ipcMain.on('drugs-table-delete', (event, name) => {
    knex('drugs')
      .where({name})
      .del()
      .then(() => {
        event.reply('drugs-table-delete-success');
      })
      .catch((error) => {
        console.log(error);
        event.reply('drugs-table-delete-failure');
      });
  });
  ipcMain.on('pickup_points-table-insert', (event, data) => {
    knex('pickup_points')
      .insert(snakecaseKeys(data))
      .then(() => {
        event.reply('pickup_points-table-insert-success');
      })
      .catch((error) => {
        console.log(error);
        event.reply('pickup_points-table-insert-failure');
      });
  });
  ipcMain.on('pickup_points-table-update', (event, {oldData, newData}) => {
    knex('pickup_points')
      .where({address: oldData.address})
      .update(snakecaseKeys(newData))
      .then(() => {
        event.reply('pickup_points-table-update-success');
      })
      .catch((error) => {
        console.log(error);
        event.reply('pickup_points-table-update-failure');
      });
  });
  ipcMain.on('pickup_points-table-delete', (event, address) => {
    knex('pickup_points')
      .where({address})
      .del()
      .then(() => {
        event.reply('pickup_points-table-delete-success');
      })
      .catch((error) => {
        console.log(error);
        event.reply('pickup_points-table-delete-failure');
      });
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
