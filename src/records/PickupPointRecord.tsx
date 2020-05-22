interface PickupPointRecordInterface {
  readonly pharmacyName: string;
  readonly address: string;
  readonly workTime: string;
  readonly deliveryPrice: number;
}

class PickupPointRecord implements PickupPointRecordInterface {
  readonly pharmacyName: string;
  readonly address: string;
  readonly workTime: string;
  readonly deliveryPrice: number;

  constructor(
    pickupPoint: Pick<
      PickupPointRecord,
      'pharmacyName' | 'address' | 'workTime' | 'deliveryPrice'
    >
  ) {
    this.pharmacyName = pickupPoint.pharmacyName;
    this.address = pickupPoint.address;
    this.workTime = pickupPoint.workTime;
    this.deliveryPrice = pickupPoint.deliveryPrice;
  }
}

export default PickupPointRecord;
