import { User } from './../auth/user.models';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorService } from './../errors/error.service';
import { NotificationService } from './../notification/notification.service';
import { AuthService } from './../auth/auth.service';

@Component({
    selector: 'app-profile-info',
    templateUrl: './profile-info.component.html'
})
export class ProfileInfoComponent {
   
    myForm: FormGroup;

    constructor(private authService: AuthService, 
                private errorService: ErrorService, 
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
      const user = new User('', '', this.myForm.value.firstName, this.myForm.value.lastName);
      this.authService.update(user)
        .subscribe(
          (data) => {
            this.notificationService.handleNotification(data.message, true);
          }
        );
    }
}