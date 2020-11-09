import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
    products: any = [];
    
    constructor(
        private productService: ProductService
    ) { }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(products => {
            this.products = products;
            console.log(this.products);
        });
    }

}
