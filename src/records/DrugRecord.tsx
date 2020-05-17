interface DrugRecordInterface {
  readonly name: string;
  readonly description: string;
  readonly count: number;
  readonly price: number;
}

class DrugRecord implements DrugRecordInterface {
  readonly name: string;
  readonly description: string;
  readonly count: number;
  readonly price: number;

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
