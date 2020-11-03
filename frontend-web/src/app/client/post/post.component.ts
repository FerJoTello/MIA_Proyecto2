import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { AlertService } from 'src/app/services/alert.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
    productForm: FormGroup;
    keywords = [];
    categories: any = [];
    constructor(private productService: ProductService, private alertService: AlertService) { }

    ngOnInit(): void {
        this.productService.getCategories().subscribe(categories => {
            this.categories = categories;
        });
        this.productForm = new FormBuilder().group({
            name: [''],
            detail: [''],
            price: [''],
            category: ['']
        });
    }

    get form() {
        return this.productForm.controls;
    }

    createProduct(): void {
        let product = new Product(
            this.form.name.value,
            this.form.price.value,
            this.form.category.value,
            this.form.detail.value
        );
        console.log(product);
        this.productService.insertProduct(product).subscribe(
            data => {
                this.alertService.success("Producto registrado correctamente.")
            }, err => {
                console.error(err);
                this.alertService.error("Ha ocurrido un error." + err);
            }
        );
    }
}
