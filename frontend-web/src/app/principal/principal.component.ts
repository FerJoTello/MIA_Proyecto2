import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';

@Component({
    selector: 'app-principal',
    templateUrl: './principal.component.html',
    styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit, OnDestroy{

    activate = false;
    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getAlert()
            .subscribe(message => {
                if (message && message.keepAfterRouteChange) {
                    this.activate = true;
                } else {
                    this.activate = false;
                }
            });
    }

    ngOnDestroy(){

    }
}
