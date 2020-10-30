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

}
