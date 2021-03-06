import { User } from './../../shared/models/user.models';
import { AuthService } from './../../shared/services/auth.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from './../../shared/notification/notification.service';

@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.component.html',
    styleUrls: ['./forgot.component.css']
})
export class ForgotComponent {
    myForm: FormGroup;

    constructor(
        private authService: AuthService, 
        private notificationService: NotificationService) { }

    ngOnInit() {
        this.myForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')
            ])
        });
    }

    onSubmit() {
        const user = new User(this.myForm.value.email, '');
        this.authService.forgot(user)
            .subscribe(
                data => {
                    this.notificationService.handleNotification(data.message, 'primary');
                },
                error => this.notificationService.handleNotification(error.title, 'danger')
        );

        this.myForm.reset();
    } 
}