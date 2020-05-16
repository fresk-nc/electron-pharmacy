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
    pickupPoint: Pick<
      PickupPointRecord,
      'name' | 'address' | 'workTime' | 'price'
    >
  ) {
    this.name = pickupPoint.name;
    this.address = pickupPoint.address;
    this.workTime = pickupPoint.workTime;
    this.price = pickupPoint.price;
  }
}

export default PickupPointRecord;
