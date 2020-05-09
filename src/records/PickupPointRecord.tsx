interface PickupPointRecordInterface {
  name: string;
  address: string;
  workTime: string;
  price: number;
}

class PickupPointRecord implements PickupPointRecordInterface {
  name: string;
  address: string;
  workTime: string;
  price: number;

  constructor(
    drug: Pick<PickupPointRecord, 'name' | 'address' | 'workTime' | 'price'>
  ) {
    this.name = drug.name;
    this.address = drug.address;
    this.workTime = drug.workTime;
    this.price = drug.price;
  }
}

export default PickupPointRecord;
