import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: '[app-row-product]',
    templateUrl: './row-product.component.html',
    styleUrls: ['./row-product.component.css']
})
export class RowProductComponent implements OnInit {

    constructor() { }

    @Input("product") rowProduct: any;

    @Input("index") i: any;

    @Output() messageEvent = new EventEmitter<any>();
    ngOnInit(): void {
    }

    inc() {
        this.rowProduct.quantity++;
        this.messageEvent.emit(this.rowProduct);
    }

    dec() {
        if (this.rowProduct.quantity > 1) {
            this.rowProduct.quantity--;
        }
        this.messageEvent.emit(this.rowProduct);
    }



}
