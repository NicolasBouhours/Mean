import { User } from './../../shared/models/user.models';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit, NgZone  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { NotificationService } from './../../shared/notification/notification.service';

@Component({
    selector: 'app-profile-info',
    templateUrl: './profile-info.component.html',
    styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent {
   
    myForm: FormGroup;


    constructor(private authService: AuthService, 
                private notificationService: NotificationService) {}

    ngOnInit() {
        this.myForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required)
        });

        this.authService.info().subscribe(
          (data) => {
            this.myForm.controls['firstName'].setValue(data.obj.firstName);
            this.myForm.controls['lastName'].setValue(data.obj.lastName);
          }
        );
    }

    onSubmit() {
      const user = new User('', '', this.myForm.value.firstName, this.myForm.value.lastName, '');
      this.authService.update(user)
        .subscribe(
          (data) => {
            this.notificationService.handleNotification(data.message, 'primary');
          },
          (error) => this.notificationService.handleNotification(error.title, 'danger')
        );
    }
}