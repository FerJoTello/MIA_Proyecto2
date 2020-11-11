import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

    @Input() childProduct: any;
    clase: string = "btn btn-info";
    texto: string = "Añadir al carrito";
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private cartService: CartService,
        private authService: AuthenticationService
    ) { }

    ngOnInit(): void {
        if (this.childProduct.added) {
            this.changeValues();
        }
    }

    private changeValues(): void {
        this.clase = "btn btn-success active";
        this.texto = "Agregado";
        this.childProduct.added = true;
    }

    goToProduct() {
        this.router.navigate(['product', { id: this.childProduct[0] }], { relativeTo: this.route.parent });
    }
    pipe = new DatePipe('en-US'); // Use your own locale
    addToCart() {
        if (!this.childProduct.added) {
            const now = Date.now();
            const myFormattedDate = this.pipe.transform(now, 'medium');
            this.cartService.addToCart(this.authService.currentUserValue.email, this.childProduct.ID_PRODUCTO, myFormattedDate).subscribe(
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
