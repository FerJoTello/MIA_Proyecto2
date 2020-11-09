import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

    product: any;
    productImg
    default = "http://localhost:3000/uploads/no-photo.png"
    constructor(
        private productService: ProductService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.productService.getProduct(Number(this.route.snapshot.paramMap.get('id'))).subscribe(
            product => {
                if (product) {
                    this.product = product;
                    console.log(this.product);
                }
            }
        );
    }
}
