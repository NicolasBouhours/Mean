import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { NotificationService } from './notification.service';
import {Observable} from 'rxjs/Rx';
import { Notification } from './notification.model';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css'],
    animations: [
        trigger('notification', [
          state('hidden', style({
            transform: 'translateX(200px)',
            opacity: 0,
            display: 'hidden'
          })),
          state('show', style({
            transform: 'translateX(0px)',
            opacity: 1,
            display: 'block'
          })),
          transition('hidden <=> show', animate(300)),
        ]),
    ]
})
export class NotificationComponent implements OnInit {
    notification: Notification;
    type = 'is-primary';
    state = 'hidden';

    constructor(private notificationService: NotificationService) { }

    ngOnInit() {
        this.notificationService.notificationOccurend
            .subscribe(
            (notification: Notification) => {
                this.notification = notification;
                this.type = 'is-' + notification.isSuccess;
                console.log('type', this.type);
                this.state = 'show';

                let timer = Observable.timer(8000);
                timer.subscribe(t=> {
                    this.state = 'hidden';
                });
            }
        );

    }

    onNotificationHandled() {
        this.state = 'hidden';
    }
}