import { Component, OnInit, NgZone  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ErrorService } from './../../shared/errors/error.service';
import { NotificationService } from './../../shared/notification/notification.service';
import { AuthService } from './../../auth/auth.service';
import { User } from './../../auth/user.models';
import { UploadService } from './../../shared/upload/upload.service';

@Component({
    selector: 'app-profile-info',
    templateUrl: './profile-info.component.html',
    styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent {
   
    myForm: FormGroup;
    picture = '';


    constructor(private authService: AuthService, 
                private errorService: ErrorService, 
                private notificationService: NotificationService,
                private uploadService: UploadService) {}

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
          }
        );
    }

    handleUpload(event) {
        let url = 'http://localhost:3000/api/user/picture';

        var files = event.srcElement.files;
        if(event.srcElement.files[0] !== undefined) {
            console.log('file upload');
            let file: File = event.srcElement.files[0];
            this.uploadService.uploadFile(file, url)
            .catch((error) => {
                this.errorService.handleError(error);
            }).then((data) => {
                this.notificationService.handleNotification(data.message, true);
                this.picture = data.obj;
            });
        }
    }

}