import { NgModule } from '@angular/core';

import { profileRouting } from './profile.routing';
import { SharedModule } from './../shared/shared.module';
import { UploadService } from './../shared/upload/upload.service';

import { ProfileContainerComponent } from './container/profile-container.component';
import { ProfilePasswordComponent } from './password/profile-password.component';
import { ProfileInfoComponent } from './info/profile-info.component';
import { ProfilePictureComponent } from './picture/profile-picture.component';
import { ImageComponent } from './../shared/image/image.component';

@NgModule({
  declarations: [
    ProfileInfoComponent,
    ProfilePasswordComponent,
    ProfilePictureComponent,
    ImageComponent
  ],
  imports: [
    SharedModule,
    profileRouting
  ],
  providers: [UploadService]
})
export class ProfileModule {

}