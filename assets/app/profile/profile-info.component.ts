import { User } from './../auth/user.models';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';

import { ErrorService } from './../shared/errors/error.service';
import { NotificationService } from './../shared/notification/notification.service';
import { AuthService } from './../auth/auth.service';

@Component({
    selector: 'app-profile-info',
    templateUrl: './profile-info.component.html',
    styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent {
   
    myForm: FormGroup;
    picture: string = "";
    src: string = "";
    resizeOptions: ResizeOptions = {
        resizeMaxHeight: 256,
        resizeMaxWidth: 256
    };

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
            this.picture = data.obj.picture;
          }
        );
    }

    onSubmit() {
      const user = new User('', '', this.myForm.value.firstName, this.myForm.value.lastName, '');
      this.authService.update(user)
        .subscribe(
          (data) => {
            this.notificationService.handleNotification(data.message, true);
            if (this.src !== "") {
              this.picture = this.src; 
              this.src = "";
            }
          }
        );
    }

    /*selected(imageResult: ImageResult) {
        this.src = imageResult.dataURL;
            console.log(this.src);
    }*/
}