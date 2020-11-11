import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
    products: any = [];

    constructor(
        private productService: ProductService,
        private cartService: CartService,
        private authService: AuthenticationService
    ) { }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            products => {
                this.products = products;
                /*
                this.cartService.getCart(this.authService.currentUserValue.email).subscribe(
                    cartList => {
                        let founded: number = 0;
                        let productsArray: any = products;
                        for (let i = 0; i < productsArray.length; i++) {
                            const product = productsArray[i];
                            let cartArray: any = cartList;
                            for (let j = 0; j < cartArray.length; j++) {
                                const added = cartArray[j];
                                if (added.confirmed == 0 && product.ID_PRODUCTO == added.product) {
                                    product.added = true;
                                    wasBreaked = true;
                                    break;
                                } else {
                                    product.added = false;
                                }
                            }
                            this.products.push(product);
                        }
                        console.log(this.products)
                    }
                );
                 */
            }
        );
    }

}
