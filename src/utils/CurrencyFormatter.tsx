interface CurrencyFormatterInterface {
  format(): string;
}

class CurrencyFormatter implements CurrencyFormatterInterface {
  private readonly value: number;

  constructor(value: number) {
    this.value = value;
  }

  format(): string {
    return new Intl.NumberFormat('ru', {
      style: 'currency',
      currency: 'RUB',
    }).format(this.value);
  }
}

export default CurrencyFormatter;
