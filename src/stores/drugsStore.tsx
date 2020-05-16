import {ipcRenderer} from 'electron';

import CommonStore, {CommonStoreInterface} from './CommonStore';
import DrugRecord from '../records/DrugRecord';

interface DrugsStoreInterface extends CommonStoreInterface<DrugRecord[]> {
  insert(drug: DrugRecord): Promise<DrugRecord[]>;
  update(oldDrug: DrugRecord, newDrug: DrugRecord): Promise<DrugRecord[]>;
  delete(name: string): Promise<DrugRecord[]>;
}

/**
 * OOP pattern - Singleton
 */
class DrugsStore extends CommonStore<DrugRecord[]>
  implements DrugsStoreInterface {
  protected state: DrugRecord[] = [];
  protected updateEvent = 'DRUGS_STORE_UPDATED';

  insert(drug: DrugRecord): Promise<DrugRecord[]> {
    return new Promise<DrugRecord[]>((resolve, reject) => {
      ipcRenderer.send('drugs-table-insert', drug);
      ipcRenderer.once('drugs-table-insert-success', () => {
        this.state = [...this.state, drug];
        this.emit(this.updateEvent, this.state);
        resolve(this.state);
      });
      ipcRenderer.once('drugs-table-insert-failure', reject);
    });
  }

  update(oldDrug: DrugRecord, newDrug: DrugRecord): Promise<DrugRecord[]> {
    return new Promise<DrugRecord[]>((resolve, reject) => {
      ipcRenderer.send('drugs-table-update', {
        oldData: oldDrug,
        newData: newDrug,
      });
      ipcRenderer.once('drugs-table-update-success', () => {
        const newState = [...this.state];
        const index = newState.findIndex((drug) => drug.name === oldDrug.name);

        newState[index] = newDrug;

        this.state = newState;
        this.emit(this.updateEvent, this.state);
        resolve(this.state);
      });
      ipcRenderer.once('drugs-table-update-failure', reject);
    });
  }

  delete(name: string): Promise<DrugRecord[]> {
    return new Promise<DrugRecord[]>((resolve, reject) => {
      ipcRenderer.send('drugs-table-delete', name);
      ipcRenderer.once('drugs-table-delete-success', () => {
        this.state = this.state.filter((drug) => drug.name !== name);
        this.emit(this.updateEvent, this.state);
        resolve(this.state);
      });
      ipcRenderer.once('drugs-table-delete-failure', reject);
    });
  }
}

export default new DrugsStore();
