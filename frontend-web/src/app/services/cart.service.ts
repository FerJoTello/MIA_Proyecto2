import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    constructor(private http: HttpClient) { }

    getCart(email: string) {
        return this.http.get(`http://localhost:3000/api/user/cart/${email}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    addToCart(email, id_product, date) {
        return this.http.post('http://localhost:3000/api/products/addToCart', { email: email, id_product: id_product, date: date }, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    confirmBuy(array) {
        return this.http.post('http://localhost:3000/api/user/cart', { array: array }, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    cleanCart(email) {
        return this.http.post('http://localhost:3000/api/user/cleanCart', { email: email }, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }
}
