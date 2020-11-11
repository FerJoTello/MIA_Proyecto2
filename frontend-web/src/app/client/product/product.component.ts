import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

    product: any;
    added: boolean;
    clase: string = "btn btn-info";
    texto: string = "Añadir al carrito";
    default = "http://localhost:3000/uploads/no-photo.png"
    constructor(
        private productService: ProductService,
        private route: ActivatedRoute,
        private cartService: CartService,
        private authService: AuthenticationService
    ) { }

    ngOnInit(): void {
        this.productService.getProduct(Number(this.route.snapshot.paramMap.get('id'))).subscribe(
            product => {
                if (product) {
                    this.product = product;
                    console.log(product)
                }
            }
        );
    }

    private changeValues(): void {
        this.clase = "btn btn-success active";
        this.texto = "Agregado";
        this.added = true;
    }

    pipe = new DatePipe('en-US'); // Use your own locale
    addToCart() {
        if (!this.added) {
            const now = Date.now();
            const myFormattedDate = this.pipe.transform(now, 'medium');
            this.cartService.addToCart(this.authService.currentUserValue.email, this.product[0], myFormattedDate).subscribe(
                result => {
                    this.changeValues();
                }, err => {
                    console.error(err);
                }
            );
        } else {

        }

    }
}
