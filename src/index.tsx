import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';
import {ipcRenderer} from 'electron';

import drugsStore from './stores/drugsStore';
import ordersStore from './stores/ordersStore';
import DrugRecord from './records/DrugRecord';
import OrderRecord from './records/OrderRecord';
import OrderItemRecord from './records/OrderItemRecord';
import App from './components/App';
import './index.css';

ipcRenderer.send('bootstrap');
ipcRenderer.once('bootstrap-success', (_, data) => {
  drugsStore.setState(
    data.drugs.map(
      (drug: any) =>
        new DrugRecord({
          name: drug.name,
          description: drug.description,
          count: drug.count,
          price: drug.price,
        })
    )
  );
  ordersStore.setState(
    data.orders.map(
      (order: any) =>
        new OrderRecord({
          id: order.id,
          datetime: order.datetime,
          totalPrice: order.totalPrice,
          status: order.status,
          phone: order.phone,
          drugs: order.drugs.map(
            (drug: any) =>
              new OrderItemRecord({
                name: drug.name,
                count: drug.count,
                price: drug.price,
              })
          ),
        })
    )
  );

  ReactDOM.render(
    <React.StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </React.StrictMode>,
    document.getElementById('root')
  );
});
