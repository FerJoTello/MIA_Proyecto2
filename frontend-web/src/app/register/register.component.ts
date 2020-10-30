import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5';
import { User } from '../models/user';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService
    ) {
    }

    ngOnInit(): void {
        this.registerForm = new FormBuilder().group({
            firstName: [''],
            lastName: [''],
            email: [''],
            country: [''],
            birthDate: [''],
            password1: [''],
            password2: ['']
        });
    }

    get form() {
        return this.registerForm.controls;
    }

    submitRegister(): void {
        this.alertService.clear();
        if (this.form.password1.value === this.form.password2.value) {
            let hashedPass = Md5.hashStr(this.form.password1.value);
            let user = new User(
                this.form.email.value,
                String(hashedPass),
                this.form.firstName.value,
                this.form.lastName.value,
                this.form.birthDate.value,
                this.form.country.value);
            this.userService.register(user).subscribe(
                data => {
                    this.alertService.success("Registro correcto", true);
                    this.router.navigate(['/login']);
                }, err => {
                    console.error(err)
                    this.alertService.error(err);
                }
            );
        } else {
            this.alertService.error("Las contraseñas no coinciden");
        }
    }

}
