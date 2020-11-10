import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    register(user: User) {
        return this.http.post<User>('http://localhost:3000/api/register', user, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    updateProfilePicture(email: string, path: string) {
        return this.http.post('http://localhost:3000/api/user/updateProfilePicture', { email: email, path: path }, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    updateUserInfo(email, firstName, lastName, birthDate, country) {
        return this.http.post('http://localhost:3000/api/user/updateInfo', { email: email, firstName: firstName, lastName: lastName, birthDate: birthDate, country: country }, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    updateUserPassword(email, password) {
        return this.http.post('http://localhost:3000/api/user/updatePassword', { email: email, password: password }, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

}
