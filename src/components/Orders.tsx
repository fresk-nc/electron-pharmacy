import React, {useState} from 'react';
import {Column} from 'material-table';

import MuiBox from '@material-ui/core/Box';
import MuiTypography from '@material-ui/core/Typography';
import MuiTable from '@material-ui/core/Table';
import MuiTableBody from '@material-ui/core/TableBody';
import MuiTableCell from '@material-ui/core/TableCell';
import MuiTableHead from '@material-ui/core/TableHead';
import MuiTableRow from '@material-ui/core/TableRow';

import useStoreSubscribe from '../hooks/useStoreSubscribe';
import ordersStore from '../stores/ordersStore';
import OrderRecord from '../records/OrderRecord';

import Table from './Table';

type Row = OrderRecord;

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

const Orders: React.FC = () => {
  const [state, setState] = useState<TableState>({
    columns: [
      {
        title: '#',
        field: 'id',
      },
      {
        title: 'Дата и время',
        field: 'datetime',
      },
      {
        title: 'Номер телефона',
        field: 'phone',
      },
      {
        title: 'Стоимость',
        field: 'totalPrice',
        type: 'currency',
        currencySetting: {
          locale: 'ru',
          currencyCode: 'RUB',
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
  return (
    <Table
      columns={state.columns}
      data={state.data}
      title="Заказы"
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
                        {new Intl.NumberFormat('ru', {
                          style: 'currency',
                          currency: 'RUB',
                        }).format(drug.price)}
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
