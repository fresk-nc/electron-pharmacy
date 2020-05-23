import React, {useState} from 'react';
import {Column} from 'material-table';

import MuiBox from '@material-ui/core/Box';
import MuiTypography from '@material-ui/core/Typography';
import MuiTable from '@material-ui/core/Table';
import MuiTableBody from '@material-ui/core/TableBody';
import MuiTableCell from '@material-ui/core/TableCell';
import MuiTableHead from '@material-ui/core/TableHead';
import MuiTableRow from '@material-ui/core/TableRow';

import Table from './Table';
import useStoreSubscribe from '../hooks/useStoreSubscribe';
import ordersStore from '../stores/ordersStore';
import pickupPointsStore from '../stores/pickupPointsStore';
import OrderRecord from '../records/OrderRecord';
import PickupPointRecord from '../records/PickupPointRecord';
import CurrencyFormatter from '../utils/CurrencyFormatter';
import DateFormatter from '../utils/DateFormatter';
import notificationsStore from '../stores/notificationsStore';
import NotificationRecord from '../records/NotificationRecord';
import drugsStore from '../stores/drugsStore';

type Row = OrderRecord;

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

const Orders: React.FC = () => {
  const [pickupPointState, setPickupPointsState] = useState<
    PickupPointRecord[]
  >(pickupPointsStore.getState());
  const [state, setState] = useState<TableState>({
    columns: [
      {
        title: '#',
        field: 'id',
      },
      {
        title: 'Дата и время',
        render: (order) => {
          return new DateFormatter(new Date(order.datetime)).format('Pp');
        },
      },
      {
        title: 'Номер телефона',
        field: 'phone',
      },
      {
        title: 'Адрес доставки',
        render: (order) => {
          const pickupPoint = pickupPointState.find(
            ({address}) => address === order.pickupPoint
          );

          if (pickupPoint) {
            return `${pickupPoint.pharmacyName}, ${pickupPoint.address}`;
          }

          return '-';
        },
      },
      {
        title: 'Стоимость доставки',
        render: (order) => {
          return new CurrencyFormatter(order.getDeliveryPrice()).format();
        },
      },
      {
        title: 'Итоговая стоимость',
        render: (order) => {
          return new CurrencyFormatter(order.getTotalPrice()).format();
        },
      },
      {
        title: 'Статус',
        field: 'status',
      },
    ],
    data: ordersStore.getState(),
  });

  useStoreSubscribe(ordersStore, (orders: OrderRecord[]) => {
    setState((prevSate) => {
      return {...prevSate, data: orders};
    });
  });
  useStoreSubscribe(pickupPointsStore, setPickupPointsState);

  return (
    <Table
      columns={state.columns}
      data={state.data}
      title="Заказы"
      editable={{
        onRowDelete: (oldData) => {
          return ordersStore
            .delete(oldData.id)
            .then(() => {
              notificationsStore.insert(
                new NotificationRecord({
                  text: 'Операция выполнена успешно!',
                  type: 'success',
                })
              );
              drugsStore.addDrugsCount(oldData);
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
      detailPanel={(rowData) => {
        return (
          <MuiBox margin={3}>
            <MuiTypography variant="h6" gutterBottom component="div">
              Товары
            </MuiTypography>
            <MuiTable size="small" aria-label="purchases">
              <MuiTableHead>
                <MuiTableRow>
                  <MuiTableCell>Название</MuiTableCell>
                  <MuiTableCell align="right">Цена</MuiTableCell>
                  <MuiTableCell align="right">Количество</MuiTableCell>
                </MuiTableRow>
              </MuiTableHead>
              <MuiTableBody>
                {rowData.drugs.map((drug) => {
                  return (
                    <MuiTableRow key={drug.name}>
                      <MuiTableCell>{drug.name}</MuiTableCell>
                      <MuiTableCell align="right">
                        {new CurrencyFormatter(drug.price).format()}
                      </MuiTableCell>
                      <MuiTableCell align="right">{drug.count}</MuiTableCell>
                    </MuiTableRow>
                  );
                })}
              </MuiTableBody>
            </MuiTable>
          </MuiBox>
        );
      }}
      onRowClick={(event, rowData, togglePanel) => togglePanel?.()}
    />
  );
};

export default Orders;
