import isSameYear from 'date-fns/isSameYear';
import getMonth from 'date-fns/getMonth';

import ordersStore from '../stores/ordersStore';

const getChartGainByMonthData = (selectedDate: Date) => {
  const orders = ordersStore.getState().filter((order) => {
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

  orders.forEach((order) => {
    const orderMonth = getMonth(new Date(order.datetime));
    const item = data.find((_, index) => index === orderMonth);

    item!.value += order.totalPrice;
  });

  return data;
};

export default getChartGainByMonthData;
