import { Component, OnInit, NgZone  } from '@angular/core';
import { AppSettings } from './../../app.settings';
import { ErrorService } from './../../shared/errors/error.service';
import { NotificationService } from './../../shared/notification/notification.service';
import { AuthService } from './../../auth/auth.service';
import { UploadService } from './../../shared/upload/upload.service';

@Component({
    selector: 'app-profile-picture',
    templateUrl: './profile-picture.component.html',
    styleUrls: ['./profile-picture.component.css']
})
export class ProfilePictureComponent {
   
    picture = '';

    constructor(private authService: AuthService, 
                private errorService: ErrorService, 
                private notificationService: NotificationService,
                private uploadService: UploadService) {}

    ngOnInit() {

        this.authService.info().subscribe(
          (data) => {
            this.picture = data.obj.picture;
          }
        );
    }

    handleUpload(event) {
        let url = `${AppSettings.API_ENDPOINT}user/picture`;

        var files = event.srcElement.files;
        if(event.srcElement.files[0] !== undefined) {
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