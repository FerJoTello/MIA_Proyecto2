import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    constructor(
        private router: Router,
        private cartService: CartService,
        private authService: AuthenticationService,
        private alertService: AlertService,
        private userService: UserService
    ) { }

    products = []; //sended object to children

    total: number;

    requestList = new Map();

    ngOnInit(): void {
        this.cartService.getCart(this.authService.currentUserValue.email).subscribe(
            response => {
                let info: any = response;
                info.forEach(product => {
                    if (product.confirmed === 0) {
                        this.products.push(product);
                        this.requestList.set(product.product, product);
                    }
                });
                this.updateTotal();
            }
        );
    }

    receiveMessage($event) {
        this.requestList.set($event.product, $event);
        this.updateTotal();
    }

    updateTotal() {
        this.total = 0;
        this.requestList.forEach(element => {
            this.total += element.price * element.quantity;
        });
    }


    confirmBuy() {
        if (this.authService.currentUserValue.credits >= this.total) {
            let array = [];
            let array_ = [];
            array_.push({ email: this.authService.currentUserValue.email, creditsToModify: -this.total })
            this.requestList.forEach(element => {
                array.push({ id: element.id, quantity: element.quantity });
                array_.push({ email: element.seller, creditsToModify: element.price * element.quantity })
            });
            this.cartService.confirmBuy(array).subscribe(
                response => {
                    this.userService.creditsTransaction(array_).subscribe(
                        response_ => {
                            let user = this.authService.currentUserValue;
                            user.credits = user.credits - this.total;
                            this.authService.updateUser(user);
                            this.alertService.success("Compra realizada satisfactoriamente.", true);
                            this.router.navigate(['/client/index']);
                        }, err => {
                            console.error(err);
                            this.alertService.error("ERROR2");
                        }
                    );
                }, err => {
                    console.error(err);
                    this.alertService.error("ERROR1");
                }
            );
        } else {
            this.alertService.error("No cuentas con los créditos suficientes.");
        }
    }

    cleanCart() {
        this.cartService.cleanCart(this.authService.currentUserValue.email).subscribe(
            response => {
                this.alertService.success("Carrito limpiado.", true);
                this.router.navigate(['/client/index']);
            }
        );
    }

}
