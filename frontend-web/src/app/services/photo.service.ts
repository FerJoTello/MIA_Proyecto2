import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PhotoService {

    constructor(private http: HttpClient) { }

    createProductPhoto(photo: File) {
        const fd = new FormData();
        fd.append('image', photo);
        return this.http.post('http://localhost:3000/api/photos/product', fd);
    }

    createProfilePhoto(photo: File) {
        const fd = new FormData();
        fd.append('image', photo);
        return this.http.post('http://localhost:3000/api/photos/profile', fd);
    }

}
