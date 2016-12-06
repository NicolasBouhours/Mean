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
    filesToUpload: Array<File>;

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
      const user = new User('', '', this.myForm.value.firstName, this.myForm.value.lastName, '');
      this.authService.update(user)
        .subscribe(
          (data) => {
            this.notificationService.handleNotification(data.message, true);
          }
        );
    }

    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>> fileInput.target.files[0];
    }

    upload() {
        this.makeFileRequest("http://localhost:3000/api/user/picture", [], this.filesToUpload).then((result) => {
            console.log(result);
        }, (error) => {
            console.error(error);
        });
    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            for(var i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i].name);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    }

}