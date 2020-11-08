import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) { }

    getCategories() {
        return this.http.get('http://localhost:3000/api/categories', {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    insertProduct(product: Product) {
        return this.http.post('http://localhost:3000/api/products', product, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    insertKeyWord(id_product, array) {
        return this.http.post('http://localhost:3000/api/keywords', { id_product, array }, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

}
