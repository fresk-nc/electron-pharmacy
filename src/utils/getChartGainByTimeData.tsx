import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import getHours from 'date-fns/getHours';
import {DateRange} from '@material-ui/pickers';

import ordersStore from '../stores/ordersStore';

const getChartGainByTimeData = (selectedDate: DateRange) => {
  const orders = ordersStore.getState().filter((order) => {
    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      isAfter(new Date(order.datetime), selectedDate[0]) &&
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      isBefore(new Date(order.datetime), selectedDate[1])
    );
  });
  const data = [
    {name: '00-01', value: 0},
    {name: '01-02', value: 0},
    {name: '02-03', value: 0},
    {name: '03-04', value: 0},
    {name: '04-05', value: 0},
    {name: '05-06', value: 0},
    {name: '06-07', value: 0},
    {name: '07-08', value: 0},
    {name: '08-09', value: 0},
    {name: '09-10', value: 0},
    {name: '10-11', value: 0},
    {name: '12-13', value: 0},
    {name: '13-14', value: 0},
    {name: '14-15', value: 0},
    {name: '15-16', value: 0},
    {name: '16-17', value: 0},
    {name: '17-18', value: 0},
    {name: '18-19', value: 0},
    {name: '19-20', value: 0},
    {name: '20-21', value: 0},
    {name: '21-22', value: 0},
    {name: '22-23', value: 0},
    {name: '23-24', value: 0},
  ];

  orders.forEach((order) => {
    const orderHour = getHours(new Date(order.datetime));
    const item = data.find((_, index) => index === orderHour);

    item!.value += order.totalPrice;
  });

  return data;
};

export default getChartGainByTimeData;
