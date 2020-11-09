import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PhotoService } from 'src/app/services/photo.service';
import { ProductService } from 'src/app/services/product.service';

interface HtmlInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
    productForm: FormGroup;
    keywords = [];
    categories: any = [];
    photoSelected: string | ArrayBuffer;
    file: File;
    fileInputPlaceholder: string = "Seleccione un archivo";
    constructor(
        private router: Router,
        private productService: ProductService,
        private alertService: AlertService,
        private photoService: PhotoService,
        private authenticationService: AuthenticationService
    ) { }

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

    // image preview
    onPhotoSelected(event: HtmlInputEvent): void {
        if (event.target.files && event.target.files[0]) {
            this.file = <File>event.target.files[0];
            const reader = new FileReader();
            reader.onload = e => this.photoSelected = reader.result;
            reader.readAsDataURL(this.file);
            this.fileInputPlaceholder = this.file.name;
        }
    }
    pipe = new DatePipe('en-US'); // Use your own locale
    createProduct(): void {
        this.photoService.createPhoto(this.file).subscribe(
            data => {
                const now = Date.now();
                const myFormattedDate = this.pipe.transform(now, 'medium');
                let product = new Product(
                    this.form.name.value,
                    this.form.price.value,
                    this.form.category.value,
                    this.form.detail.value,
                    this.authenticationService.currentUserValue.email,
                    data['path'],
                    myFormattedDate
                );
                // insert product
                this.productService.insertProduct(product).subscribe(
                    data => {
                        let keys = []
                        for (let index = 0; index < this.keywords.length; index++) {
                            keys.push({ value: this.keywords[index]['value'] })
                        }
                        try {
                            this.productService.insertKeyWord(data['id_producto'], keys).subscribe(
                                value => {
                                    //console.log(value);
                                }
                            );
                        } catch (err) { }
                        this.alertService.success("Producto registrado correctamente.", true);
                        this.router.navigate(['/client/index']);
                    }, err => {
                        console.error(err);
                        this.alertService.error("Ha ocurrido un error.");
                        return
                    }
                );
            },
            err => {
                console.log(err);
                this.alertService.error("Ha ocurrido un error.");
                return
            }
        );
    }
}
