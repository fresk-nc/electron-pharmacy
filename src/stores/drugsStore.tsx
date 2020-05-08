import EventEmitter from 'events';
import {ipcRenderer} from 'electron';

import DrugRecord from '../records/DrugRecord';

interface DrugsStoreInterface {
  getState(): DrugRecord[];
  getUpdateEvent(): string;
  setRawData(drugs: RawDrug[]): void;
  insert(drug: DrugRecord): Promise<DrugRecord[]>;
  update(oldDrug: DrugRecord, newDrug: DrugRecord): Promise<DrugRecord[]>;
  delete(name: string): Promise<DrugRecord[]>;
}

type RawDrug = {
  name: string;
  price: number;
  count: number;
};

class DrugsStore extends EventEmitter implements DrugsStoreInterface {
  private state: DrugRecord[] = [];
  private updateEvent = 'DRUGS_STORE_UPDATED';

  getState(): DrugRecord[] {
    return this.state;
  }

  getUpdateEvent(): string {
    return this.updateEvent;
  }

  setRawData(drugs: RawDrug[]): void {
    this.state = drugs.map(
      (drug) => new DrugRecord(drug.name, drug.count, drug.price)
    );
  }

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
