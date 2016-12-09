import { AuthService } from './../../shared/services/auth.service';
import { UploadService } from './../../shared/services/upload.service';
import { Component, OnInit, NgZone  } from '@angular/core';
import { AppSettings } from './../../app.settings';
import { NotificationService } from './../../shared/notification/notification.service';

@Component({
    selector: 'app-profile-picture',
    templateUrl: './profile-picture.component.html',
    styleUrls: ['./profile-picture.component.css']
})
export class ProfilePictureComponent {
   
    picture = '';

    constructor(private authService: AuthService, 
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
            if (file.type === 'image/png' || file.type === 'image/jpeg') {
                this.uploadService.uploadFile(file, url)
                .catch((error) => {
                    this.notificationService.handleNotification(error.title, 'danger');
                }).then((data) => {
                    this.notificationService.handleNotification(data.message, 'primary');
                    this.picture = data.obj;
                });
            } else {
                this.notificationService.handleNotification('Merci d\'envoyer des fichiers de type image', 'danger');
            }
        }
    }

}