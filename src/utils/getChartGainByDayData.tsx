import isSameMonth from 'date-fns/isSameMonth';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import getDate from 'date-fns/getDate';

import ordersStore from '../stores/ordersStore';
import formatDate from './formatDate';

const getChartGainByDayData = (selectedDate: Date) => {
  const orders = ordersStore.getState().filter((order) => {
    return isSameMonth(new Date(order.datetime), selectedDate);
  });
  const data = eachDayOfInterval({
    start: startOfMonth(new Date(selectedDate)),
    end: endOfMonth(new Date(selectedDate)),
  }).map((date) => {
    return {
      name: formatDate(date, 'd MMM'),
      value: 0,
    };
  });

  orders.forEach((order) => {
    const orderDate = getDate(new Date(order.datetime));
    const item = data.find((_, index) => index + 1 === orderDate);

    item!.value += order.totalPrice;
  });

  return data;
};

export default getChartGainByDayData;
