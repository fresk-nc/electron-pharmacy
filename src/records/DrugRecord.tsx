interface IDrugRecord {
    name: string;
    count: number;
    price: number;
}

class DrugRecord implements IDrugRecord {
    name: string;
    count: number;
    price: number;

    constructor(name: string, count: number, price: number) {
        this.name = name;
        this.count = count;
        this.price = price;
    }
}

export default DrugRecord;
