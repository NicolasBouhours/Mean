import { NgModule } from '@angular/core';

import { profileRouting } from './profile.routing';
import { SharedModule } from './../shared/shared.module';
import { ProfilePasswordComponent } from './profile-password.component';
import { ProfileInfoComponent } from './profile-info.component';

@NgModule({
  declarations: [
    ProfileInfoComponent,
    ProfilePasswordComponent
  ],
  imports: [
    SharedModule,
    profileRouting
  ]
})
export class ProfileModule {

}