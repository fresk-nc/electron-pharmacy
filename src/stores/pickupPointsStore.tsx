import {ipcRenderer} from 'electron';

import CommonStore, {CommonStoreInterface} from './CommonStore';
import PickupPointRecord from '../records/PickupPointRecord';

interface PickupPointsStoreInterface
  extends CommonStoreInterface<PickupPointRecord[]> {
  insert(pickupPoint: PickupPointRecord): Promise<PickupPointRecord[]>;
  update(
    oldPickupPoint: PickupPointRecord,
    newPickupPoint: PickupPointRecord
  ): Promise<PickupPointRecord[]>;
  delete(name: string): Promise<PickupPointRecord[]>;
}

/**
 * OOP pattern - Singleton
 */
class PickupPointsStore extends CommonStore<PickupPointRecord[]>
  implements PickupPointsStoreInterface {
  protected state: PickupPointRecord[] = [];
  protected updateEvent = 'PICKUP_POINTS_STORE_UPDATED';

  insert(pickupPoint: PickupPointRecord): Promise<PickupPointRecord[]> {
    return new Promise<PickupPointRecord[]>((resolve, reject) => {
      ipcRenderer.send('pickup_points-table-insert', pickupPoint);
      ipcRenderer.once('pickup_points-table-insert-success', () => {
        this.state = [...this.state, pickupPoint];
        this.emit(this.updateEvent, this.state);
        resolve(this.state);
      });
      ipcRenderer.once('pickup_points-table-insert-failure', reject);
    });
  }

  update(
    oldPickupPoint: PickupPointRecord,
    newPickupPoint: PickupPointRecord
  ): Promise<PickupPointRecord[]> {
    return new Promise<PickupPointRecord[]>((resolve, reject) => {
      ipcRenderer.send('pickup_points-table-update', {
        oldData: oldPickupPoint,
        newData: newPickupPoint,
      });
      ipcRenderer.once('pickup_points-table-update-success', () => {
        const newState = [...this.state];
        const index = newState.findIndex(
          (pickupPoint) => pickupPoint.address === oldPickupPoint.address
        );

        newState[index] = newPickupPoint;

        this.state = newState;
        this.emit(this.updateEvent, this.state);
        resolve(this.state);
      });
      ipcRenderer.once('pickup_points-table-update-failure', reject);
    });
  }

  delete(address: string): Promise<PickupPointRecord[]> {
    return new Promise<PickupPointRecord[]>((resolve, reject) => {
      ipcRenderer.send('pickup_points-table-delete', address);
      ipcRenderer.once('pickup_points-table-delete-success', () => {
        this.state = this.state.filter(
          (pickupPoint) => pickupPoint.address !== address
        );
        this.emit(this.updateEvent, this.state);
        resolve(this.state);
      });
      ipcRenderer.once('pickup_points-table-delete-failure', reject);
    });
  }
}

export default new PickupPointsStore();
