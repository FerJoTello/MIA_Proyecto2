import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';
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
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {
    }

    ngOnInit(): void {
        this.registerForm = new FormBuilder().group({
            firstName: [''],
            lastName: [''],
            email: [''],
            birthDate: [''],
            password1: [''],
            password2: [''],
            imgFile: ['']
        });
    }

    get form() {
        return this.registerForm.controls;
    }

    submitRegister(): void {
        
        //this.userService.register()

    }

}
