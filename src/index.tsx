import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';
import {ipcRenderer} from 'electron';
import DateFnsAdapter from '@material-ui/pickers/adapter/date-fns';
import {LocalizationProvider} from '@material-ui/pickers';
import ruLocale from 'date-fns/locale/ru';

import drugsStore from './stores/drugsStore';
import ordersStore from './stores/ordersStore';
import pickupPointsStore from './stores/pickupPointsStore';
import DrugRecord from './records/DrugRecord';
import OrderRecord from './records/OrderRecord';
import OrderItemRecord from './records/OrderItemRecord';
import PickupPointRecord from './records/PickupPointRecord';
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
          status: order.status,
          phone: order.phone,
          pickupPoint: order.pickupPoint,
          drugs: order.drugs.map((drug: any) => new OrderItemRecord(drug)),
        })
    )
  );
  pickupPointsStore.setState(
    data.pickupPoints.map((pickupPoint: any) => {
      return new PickupPointRecord({
        pharmacyName: pickupPoint.pharmacyName,
        address: pickupPoint.address,
        workTime: pickupPoint.workTime,
        deliveryPrice: pickupPoint.deliveryPrice,
      });
    })
  );

  ReactDOM.render(
    <React.StrictMode>
      <HashRouter>
        <LocalizationProvider dateAdapter={DateFnsAdapter} locale={ruLocale}>
          <App />
        </LocalizationProvider>
      </HashRouter>
    </React.StrictMode>,
    document.getElementById('root')
  );
});
