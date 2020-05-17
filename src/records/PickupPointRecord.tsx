interface PickupPointRecordInterface {
  readonly name: string;
  readonly address: string;
  readonly workTime: string;
  readonly price: number;
}

class PickupPointRecord implements PickupPointRecordInterface {
  readonly name: string;
  readonly address: string;
  readonly workTime: string;
  readonly price: number;

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
