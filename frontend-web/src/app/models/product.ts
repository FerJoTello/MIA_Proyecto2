export class Product {
    name: string;
    price: number;
    category: string;
    detail: string;

    constructor(name: string, price: number, category: string, detail: string) {
        this.name = name;
        this.price = price;
        this.category = category;
        this.detail = detail;
    }
}