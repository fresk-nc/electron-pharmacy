import React from 'react';

import MuiBox from '@material-ui/core/Box';
import MuiTypography from '@material-ui/core/Typography';
import MuiTable from '@material-ui/core/Table';
import MuiTableBody from '@material-ui/core/TableBody';
import MuiTableCell from '@material-ui/core/TableCell';
import MuiTableHead from '@material-ui/core/TableHead';
import MuiTableRow from '@material-ui/core/TableRow';

import Table from './Table';

const Orders: React.FC = () => {
  return (
    <Table
      columns={[
        {
          title: '#',
          field: 'number',
        },
        {
          title: 'Дата и время',
          field: 'datetime',
        },
        {
          title: 'Стоимость',
          field: 'price',
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
      ]}
      data={[
        {
          number: '001',
          datetime: '2020-01-01 10:00',
          price: 2000,
          status: 'Оплачен',
          drugs: [
            {
              name: 'Анальгин',
              price: 50,
              count: 1,
            },
            {
              name: 'Гептрал',
              price: 2050,
              count: 1,
            },
          ],
        },
        {
          number: '002',
          datetime: '2020-01-01 10:00',
          price: 3000,
          status: 'Доставлен',
          drugs: [
            {
              name: 'Гептрал',
              price: 2050,
              count: 1,
            },
          ],
        },
      ]}
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
                      <MuiTableCell align="right">{drug.price}</MuiTableCell>
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
