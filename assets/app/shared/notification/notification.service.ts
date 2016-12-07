import { EventEmitter } from '@angular/core';
import { Notification } from './notification.model';

export class NotificationService {
    notificationOccurend = new EventEmitter<Notification>();

    handleNotification(message: string, type: string) {
        const notificationData = new Notification(message, type);
        this.notificationOccurend.emit(notificationData);
    }
}