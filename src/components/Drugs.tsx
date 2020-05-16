import React, {useState} from 'react';
import {Column} from 'material-table';

import DrugRecord from '../records/DrugRecord';
import NotificationRecord from '../records/NotificationRecord';
import drugsStore from '../stores/drugsStore';
import snackbarStore from '../stores/snackbarStore';
import useStoreSubscribe from '../hooks/useStoreSubscribe';
import DrugValidationSchema from '../validations/DrugValidationSchema';
import Table from './Table';
import TableEditField from './TableEditField';
import TableEditRow from './TableEditRow';

type Row = DrugRecord;

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

const Drugs: React.FC = () => {
  const [state, setState] = useState<TableState>({
    columns: [
      {
        title: 'Название',
        field: 'name',
        initialEditValue: '',
      },
      {
        title: 'Описание',
        field: 'description',
        initialEditValue: '',
      },
      {
        title: 'Цена',
        field: 'price',
        type: 'currency',
        currencySetting: {
          locale: 'ru',
          currencyCode: 'RUB',
        },
        initialEditValue: 0,
      },
      {
        title: 'Количество',
        field: 'count',
        type: 'numeric',
        initialEditValue: 0,
      },
    ],
    data: drugsStore.getState(),
  });

  useStoreSubscribe(drugsStore, (drugs: DrugRecord[]) => {
    setState((prevSate) => {
      return {...prevSate, data: drugs};
    });
  });

  return (
    <Table
      title="Лекарства"
      columns={state.columns}
      data={state.data}
      components={{
        EditRow: (props: any) => (
          <TableEditRow {...props} validationSchema={DrugValidationSchema} />
        ),
        EditField: TableEditField,
      }}
      editable={{
        onRowAdd: (newData) => {
          return drugsStore
            .insert(
              new DrugRecord({
                name: newData.name,
                description: newData.description,
                count: newData.count,
                price: newData.price,
              })
            )
            .then(() => {
              snackbarStore.addNotification(
                new NotificationRecord({
                  text: 'Операция выполнена успешно!',
                  type: 'success',
                })
              );
            })
            .catch((error) => {
              snackbarStore.addNotification(
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

          return drugsStore
            .update(
              new DrugRecord({
                name: oldData.name,
                description: oldData.description,
                count: oldData.count,
                price: oldData.price,
              }),
              new DrugRecord({
                name: newData.name,
                description: newData.description,
                count: newData.count,
                price: newData.price,
              })
            )
            .then(() => {
              snackbarStore.addNotification(
                new NotificationRecord({
                  text: 'Операция выполнена успешно!',
                  type: 'success',
                })
              );
            })
            .catch((error) => {
              snackbarStore.addNotification(
                new NotificationRecord({
                  text: 'Упс, что-то пошло не так, попробуйте ещё раз!',
                  type: 'error',
                })
              );
              return Promise.reject(error);
            });
        },
        onRowDelete: (oldData) => {
          return drugsStore
            .delete(oldData.name)
            .then(() => {
              snackbarStore.addNotification(
                new NotificationRecord({
                  text: 'Операция выполнена успешно!',
                  type: 'success',
                })
              );
            })
            .catch((error) => {
              snackbarStore.addNotification(
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

export default Drugs;
