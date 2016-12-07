import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { NotificationService } from './notification.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { Notification } from './notification.model';
import { AppSettings } from './../../app.settings';

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
            opacity: 0.9,
            display: 'block'
          })),
          transition('hidden <=> show', animate(300)),
        ]),
    ]
})
export class NotificationComponent implements OnInit {
    notification: Notification;
    timerSubscription: Subscription;
    type = '';
    state = 'hidden';

    constructor(private notificationService: NotificationService) { }

    ngOnInit() {
        this.notificationService.notificationOccurend
            .subscribe(
            (notification: Notification) => {

                if(this.timerSubscription !== undefined) {
                    this.timerSubscription.unsubscribe();
                }

                this.notification = notification;
                this.type = 'is-' + notification.type;
                this.state = 'show';

                let timer = Observable.timer(AppSettings.NOTIFICATION_DURATION);
                this.timerSubscription = timer.subscribe(t=> {
                    this.state = 'hidden';
                });
            }
        );

    }

    onNotificationHandled() {
        this.state = 'hidden';
    }
}