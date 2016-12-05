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
            console.log('data', data);
            this.myForm.controls['firstName'].setValue(data.obj.firstName);
            this.myForm.controls['lastName'].setValue(data.obj.lastName);
          }
        );
    }
}