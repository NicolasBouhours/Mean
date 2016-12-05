import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { NotificationService } from './../shared/notification/notification.service';
import { ErrorService } from './../shared/errors/error.service';
import { AuthService } from './../auth/auth.service';

@Component({
    selector: 'app-profile-password',
    templateUrl: './profile-password.component.html',
    styleUrls: ['./profile-password.component.css']
})
export class ProfilePasswordComponent {
    myForm: FormGroup;

    constructor(private authService: AuthService, 
                private errorService: ErrorService, 
                private notificationService: NotificationService) {}

    ngOnInit() {
        this.myForm = new FormGroup({
            password: new FormControl(null, Validators.required),
            newPassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
            newConfirmPassword: new FormControl(null, Validators.required)
        }, this.authService.confirmPasswordValidator('newPassword', 'newConfirmPassword'));
    }

    onSubmit() {
      this.authService.updatePassword(
        this.myForm.value.password,
        this.myForm.value.newPassword, 
        this.myForm.value.newConfirmPassword
        )
        .subscribe(
          (data) => {
            this.notificationService.handleNotification(data.message, true);
            this.myForm.reset();
          }
        );
    }
}