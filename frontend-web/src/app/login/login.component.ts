import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';
import {Md5} from 'ts-md5/dist/md5';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    constructor(
        private service: AuthenticationService,
        private router: Router,
        private alertService: AlertService
    ) {


    }

    ngOnInit(): void {
        this.loginForm = new FormBuilder().group({
            inputEmail1: [''],
            inputPassword: ['']
        });
    }

    get form() {
        return this.loginForm.controls;
    }

    login() {
        this.alertService.clear();
        this.service.login(this.form.inputEmail1.value, String(Md5.hashStr(this.form.inputPassword.value))).
            subscribe(
                data => {
                    if (data) {
                        if (data.type==2){
                            this.router.navigate(['/client']);
                        }
                        else if (data.type==1){
                            this.router.navigate(['/admin']);
                        }
                    }   
                    else {
                        this.alertService.error("Usuario o contraseña incorrectos.")
                    }
                }, error => {
                    this.alertService.error(error);
                }
            )
    }

}
