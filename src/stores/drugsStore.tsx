import EventEmitter from 'events';

//import { ActionTypes } from '../ActionTypes';
import DrugRecord from '../records/DrugRecord';

interface IDrugsStore {
    getData(): DrugRecord[];
    setRawData(drugs: IRawDrug[]): void;
}

interface IRawDrug {
    name: string;
    price: number;
    count: number;
}

class DrugsStore extends EventEmitter implements IDrugsStore {
    private state: DrugRecord[] = [];

    getData(): DrugRecord[] {
        return this.state;
    }

    setRawData(drugs: IRawDrug[]): void {
        this.state = drugs.map((drug) => new DrugRecord(
            drug.name,
            drug.count,
            drug.price
        ));
    }
}

export default new DrugsStore();
