import EventEmitter from 'events';
import { ipcRenderer } from 'electron';

import DrugRecord from '../records/DrugRecord';

interface IDrugsStore {
    getState(): DrugRecord[];
    getUpdateEvent(): string;
    setRawData(drugs: IRawDrug[]): void;
    insert(drug: DrugRecord): Promise<DrugRecord[]>
}

interface IRawDrug {
    name: string;
    price: number;
    count: number;
}

class DrugsStore extends EventEmitter implements IDrugsStore {
    private state: DrugRecord[] = [];
    private updateEvent: string = 'DRUGS_STORE_UPDATED';

    getState(): DrugRecord[] {
        return this.state;
    }

    getUpdateEvent(): string {
        return this.updateEvent;
    }

    setRawData(drugs: IRawDrug[]): void {
        this.state = drugs.map((drug) => new DrugRecord(
            drug.name,
            drug.count,
            drug.price
        ));
    }

    insert(drug: DrugRecord): Promise<DrugRecord[]> {
        return new Promise<DrugRecord[]>((resolve, reject) => {
            ipcRenderer.send('drugs-table-insert', drug);
            ipcRenderer.once('drugs-table-insert-success', () => {
                this.state = [ ...this.state, drug ];
                this.emit(this.updateEvent, this.state);
                resolve(this.state);
            });
            ipcRenderer.once('drugs-table-insert-failure', reject);
        });
    }
}

export default new DrugsStore();
