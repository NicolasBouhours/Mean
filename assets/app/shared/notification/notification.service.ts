import { EventEmitter } from '@angular/core';
import { Notification } from './notification.model';

export class NotificationService {
    notificationOccurend = new EventEmitter<Notification>();

    handleNotification(message: string, isSuccess: boolean) {
        const notificationData = new Notification(message, isSuccess);
        this.notificationOccurend.emit(notificationData);
    }
}