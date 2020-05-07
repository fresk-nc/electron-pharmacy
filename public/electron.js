const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: path.join(__dirname, '../pharmacy.db')
    }
});

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 680,
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    if (isDev) {
        // Open the DevTools.
        //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
        mainWindow.webContents.openDevTools();
    }
    mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', () => {
    createWindow();

    ipcMain.on('bootstrap',  (event) => {
        knex.select().from('drugs').then((drugs) => {
            event.reply('bootstrap-success', { drugs });
        });
    });
    ipcMain.on('drugs-table-insert', (event, data) => {
        knex('drugs').insert(data).then(() => {
            event.reply('drugs-table-insert-success');
        }).catch((error) => {
            console.log(error);
            event.reply('drugs-table-insert-failure');
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
