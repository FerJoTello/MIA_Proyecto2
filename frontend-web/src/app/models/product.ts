export class Product {
    name: string;
    price: number;
    category: string;
    detail: string;
    user: string;
    image: string;
    postDate: string;

    constructor(name: string, price: number, category: string, detail: string, user: string, image: string, date: string) {
        this.name = name;
        this.price = price;
        this.category = category;
        this.detail = detail;
        this.user = user;
        this.image = image;
        this.postDate = date;
    }
}