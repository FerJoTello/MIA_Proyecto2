import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PhotoService } from 'src/app/services/photo.service';
import { UserService } from 'src/app/services/user.service';
import { Md5 } from 'ts-md5/dist/md5';

interface HtmlInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    // for data binding and access info
    actualUser: any;
    imgFile: string | ArrayBuffer;
    firstName: string;
    lastName: string;
    // password
    passwordForm: FormGroup;
    constructor(private authenticationService: AuthenticationService, private photoService: PhotoService, private userService: UserService, private alertService: AlertService) {
        this.actualUser = this.authenticationService.currentUserValue;
        if (this.actualUser.imgFile == null) {
            this.imgFile = `http://localhost:3000/profile/default-user.png`
        } else {
            this.imgFile = `http://localhost:3000/${this.actualUser.imgFile}`
        }
    }

    ngOnInit(): void {
        this.firstName = this.actualUser.firstName;
        this.lastName = this.actualUser.lastName;
        this.passwordForm = new FormBuilder().group({
            actualPassword: [''],
            newPassword1: [''],
            newPassword2: ['']
        });
    }

    file: File;
    selectedPhoto: boolean = false;
    // image preview
    onPhotoSelected(event: HtmlInputEvent): void {
        this.alertService.clear();
        if (event.target.files && event.target.files[0]) {
            this.file = <File>event.target.files[0];
            const reader = new FileReader();
            reader.onload = e => this.imgFile = reader.result;
            reader.readAsDataURL(this.file);
            this.selectedPhoto = true;
        }
    }

    confirmProfilePicture() {
        this.alertService.clear();
        this.photoService.createProfilePhoto(this.file).subscribe(
            data => {
                this.userService.updateProfilePicture(this.actualUser.email, data['path']).subscribe(
                    info => {
                        this.actualUser.imgFile = data['path'];
                        this.authenticationService.updateUser(this.actualUser);
                        this.alertService.success("Foto de perfil actualizada.");
                        this.cancelProfilePicture();
                    },
                    err => {
                        this.alertService.error("Ocurrió un error al subir la foto. ERROR 2.");
                        this.cancelProfilePicture();
                    }
                );
            },
            err => {
                this.alertService.error("Ocurrió un error al subir la foto. ERROR 1.");
                this.cancelProfilePicture();
            }
        );
    }

    cancelProfilePicture() {
        this.selectedPhoto = false;
        if (this.actualUser.imgFile == null) {
            this.imgFile = `http://localhost:3000/profile/default-user.png`
        } else {
            this.imgFile = `http://localhost:3000/${this.actualUser.imgFile}`
        }
    }
    pipe = new DatePipe('en-US'); // Use your own locale
    modifyUserInfo() {
        this.alertService.clear();
        const myFormattedDate = this.pipe.transform(this.actualUser.birthDate, 'mediumDate');
        this.userService.updateUserInfo(this.actualUser.email, this.actualUser.firstName, this.actualUser.lastName, myFormattedDate, this.actualUser.country).subscribe(
            data => {
                this.authenticationService.updateUser(this.actualUser);
                this.alertService.success("Datos actualizados");
                this.firstName = this.actualUser.firstName;
                this.lastName = this.actualUser.lastName;
            },
            err => {
                console.error(err);
            }
        );
    }

    get form() {
        return this.passwordForm.controls;
    }

    modifyPassword() {
        this.alertService.clear();
        if (this.form.newPassword1.value === this.form.newPassword2.value) {
            this.authenticationService.checkUserCredentials(this.actualUser.email, String(Md5.hashStr(this.form.actualPassword.value))).subscribe(
                vaidCredentials => {
                    if (vaidCredentials) {
                        this.userService.updateUserPassword(this.actualUser.email, String(Md5.hashStr(this.form.newPassword1.value))).subscribe(
                            info => {
                                this.passwordForm.reset();
                                this.alertService.success("Contraseña modificada.")
                            }
                        );
                    }
                    else {
                        this.alertService.error("Contraseña incorrecta.")
                    }
                }
            )
        } else {
            this.alertService.error("Las contraseñas no coinciden");
        }
    }
}
