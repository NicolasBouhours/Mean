import { NgModule } from '@angular/core';

import { profileRouting } from './profile.routing';
import { SharedModule } from './../shared/shared.module';
import { ProfilePasswordComponent } from './password/profile-password.component';
import { ProfileInfoComponent } from './info/profile-info.component';
import { UploadService } from './../shared/upload/upload.service';

@NgModule({
  declarations: [
    ProfileInfoComponent,
    ProfilePasswordComponent
  ],
  imports: [
    SharedModule,
    profileRouting
  ],
  providers: [UploadService]
})
export class ProfileModule {

}