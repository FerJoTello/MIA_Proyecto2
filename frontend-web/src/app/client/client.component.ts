import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

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

}
