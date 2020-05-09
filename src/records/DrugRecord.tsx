interface DrugRecordInterface {
  name: string;
  description: string;
  count: number;
  price: number;
}

class DrugRecord implements DrugRecordInterface {
  name: string;
  description: string;
  count: number;
  price: number;

  constructor(
    drug: Pick<DrugRecord, 'name' | 'description' | 'count' | 'price'>
  ) {
    this.name = drug.name;
    this.description = drug.description;
    this.count = drug.count;
    this.price = drug.price;
  }
}

export default DrugRecord;
