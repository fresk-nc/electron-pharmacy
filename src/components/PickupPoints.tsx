import React, {useState} from 'react';
import {Column} from 'material-table';

import useStoreSubscribe from '../hooks/useStoreSubscribe';
import notificationsStore from '../stores/notificationsStore';
import pickupPointsStore from '../stores/pickupPointsStore';
import PickupPointRecord from '../records/PickupPointRecord';
import NotificationRecord from '../records/NotificationRecord';
import Table from './Table';
import TableEditRow from './TableEditRow';
import TableEditField from './TableEditField';
import PickupPointValidationSchema from '../validations/PickupPointValidationSchema';

type Row = PickupPointRecord;

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

const PickupPoints: React.FC = () => {
  const [state, setState] = useState<TableState>({
    columns: [
      {
        title: 'Название',
        field: 'pharmacyName',
        initialEditValue: '',
      },
      {
        title: 'Адрес',
        field: 'address',
        initialEditValue: '',
      },
      {
        title: 'Часы работы',
        field: 'workTime',
        initialEditValue: '',
      },
      {
        title: 'Стоимость доставки',
        field: 'deliveryPrice',
        type: 'currency',
        currencySetting: {
          locale: 'ru',
          currencyCode: 'RUB',
        },
        initialEditValue: 0,
      },
    ],
    data: pickupPointsStore.getState(),
  });

  useStoreSubscribe(pickupPointsStore, (pickupPoints: PickupPointRecord[]) => {
    setState((prevSate) => {
      return {...prevSate, data: pickupPoints};
    });
  });

  return (
    <Table
      columns={state.columns}
      data={state.data}
      title="Пункты доставки"
      components={{
        EditRow: (props: any) => (
          <TableEditRow
            {...props}
            validationSchema={PickupPointValidationSchema}
          />
        ),
        EditField: TableEditField,
      }}
      editable={{
        onRowAdd: (newData) => {
          return pickupPointsStore
            .insert(
              new PickupPointRecord({
                pharmacyName: newData.pharmacyName,
                address: newData.address,
                workTime: newData.workTime,
                deliveryPrice: newData.deliveryPrice,
              })
            )
            .then(() => {
              notificationsStore.insert(
                new NotificationRecord({
                  text: 'Операция выполнена успешно!',
                  type: 'success',
                })
              );
            })
            .catch((error) => {
              notificationsStore.insert(
                new NotificationRecord({
                  text: 'Упс, что-то пошло не так, попробуйте ещё раз!',
                  type: 'error',
                })
              );
              return Promise.reject(error);
            });
        },
        onRowUpdate: (newData, oldData) => {
          if (!oldData) {
            return Promise.resolve();
          }

          return pickupPointsStore
            .update(
              new PickupPointRecord({
                pharmacyName: oldData.pharmacyName,
                address: oldData.address,
                workTime: oldData.workTime,
                deliveryPrice: oldData.deliveryPrice,
              }),
              new PickupPointRecord({
                pharmacyName: newData.pharmacyName,
                address: newData.address,
                workTime: newData.workTime,
                deliveryPrice: newData.deliveryPrice,
              })
            )
            .then(() => {
              notificationsStore.insert(
                new NotificationRecord({
                  text: 'Операция выполнена успешно!',
                  type: 'success',
                })
              );
            })
            .catch((error) => {
              notificationsStore.insert(
                new NotificationRecord({
                  text: 'Упс, что-то пошло не так, попробуйте ещё раз!',
                  type: 'error',
                })
              );
              return Promise.reject(error);
            });
        },
        onRowDelete: (oldData) => {
          return pickupPointsStore
            .delete(oldData.address)
            .then(() => {
              notificationsStore.insert(
                new NotificationRecord({
                  text: 'Операция выполнена успешно!',
                  type: 'success',
                })
              );
            })
            .catch((error) => {
              notificationsStore.insert(
                new NotificationRecord({
                  text: 'Упс, что-то пошло не так, попробуйте ещё раз!',
                  type: 'error',
                })
              );
              return Promise.reject(error);
            });
        },
      }}
      options={{
        exportButton: true,
      }}
    />
  );
};

export default PickupPoints;
