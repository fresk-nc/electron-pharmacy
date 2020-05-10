const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('ru', {
    style: 'currency',
    currency: 'RUB',
  }).format(value);
};

export default formatCurrency;
