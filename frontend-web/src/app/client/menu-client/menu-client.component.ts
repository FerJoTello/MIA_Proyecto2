import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
    selector: 'app-menu-client',
    templateUrl: './menu-client.component.html',
    styleUrls: ['./menu-client.component.css']
})
export class MenuClientComponent implements OnInit {

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
        ) { }

    ngOnInit(): void {
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
