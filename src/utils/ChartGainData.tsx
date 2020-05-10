import isSameMonth from 'date-fns/isSameMonth';
import isSameYear from 'date-fns/isSameYear';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import getDate from 'date-fns/getDate';
import getMonth from 'date-fns/getMonth';
import getHours from 'date-fns/getHours';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import {DateRange} from '@material-ui/pickers';

import OrderRecord from '../records/OrderRecord';
import DateFormatter from './DateFormatter';

interface ChartGainDataInterface {
  getDataByTime(
    orders: OrderRecord[],
    selectedDate: DateRange
  ): ReadonlyArray<object>;
  getDataByDay(
    orders: OrderRecord[],
    selectedDate: Date
  ): ReadonlyArray<object>;
  getDataByMonth(
    orders: OrderRecord[],
    selectedDate: Date
  ): ReadonlyArray<object>;
}

class ChartGainData implements ChartGainDataInterface {
  getDataByTime(
    orders: OrderRecord[],
    selectedDate: DateRange
  ): ReadonlyArray<object> {
    const ordersByPeriod = orders.filter((order) => {
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

    ordersByPeriod.forEach((order) => {
      const orderHour = getHours(new Date(order.datetime));
      const item = data.find((_, index) => index === orderHour);

      item!.value += order.totalPrice;
    });

    return data;
  }

  getDataByDay(
    orders: OrderRecord[],
    selectedDate: Date
  ): ReadonlyArray<object> {
    const ordersByPeriod = orders.filter((order) => {
      return isSameMonth(new Date(order.datetime), selectedDate);
    });
    const data = eachDayOfInterval({
      start: startOfMonth(new Date(selectedDate)),
      end: endOfMonth(new Date(selectedDate)),
    }).map((date) => {
      return {
        name: new DateFormatter(date).format('d MMM'),
        value: 0,
      };
    });

    ordersByPeriod.forEach((order) => {
      const orderDate = getDate(new Date(order.datetime));
      const item = data.find((_, index) => index + 1 === orderDate);

      item!.value += order.totalPrice;
    });

    return data;
  }

  getDataByMonth(
    orders: OrderRecord[],
    selectedDate: Date
  ): ReadonlyArray<object> {
    const ordersByPeriod = orders.filter((order) => {
      return isSameYear(new Date(order.datetime), selectedDate);
    });
    const data = [
      {name: 'Январь', value: 0},
      {name: 'Февраль', value: 0},
      {name: 'Март', value: 0},
      {name: 'Апрель', value: 0},
      {name: 'Май', value: 0},
      {name: 'Июнь', value: 0},
      {name: 'Июль', value: 0},
      {name: 'Август', value: 0},
      {name: 'Сентябрь', value: 0},
      {name: 'Октябрь', value: 0},
      {name: 'Ноябрь', value: 0},
      {name: 'Декабрь', value: 0},
    ];

    ordersByPeriod.forEach((order) => {
      const orderMonth = getMonth(new Date(order.datetime));
      const item = data.find((_, index) => index === orderMonth);

      item!.value += order.totalPrice;
    });

    return data;
  }
}

export default ChartGainData;
