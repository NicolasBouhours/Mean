import { AuthGuard } from './../shared/guards/auth.guard';
import { Routes, RouterModule } from '@angular/router';

import { ProfileInfoComponent } from './info/profile-info.component';
import { ProfileContainerComponent } from './container/profile-container.component';
import { ProfilePasswordComponent } from './password/profile-password.component';
import { ProfilePictureComponent } from './picture/profile-picture.component';

const PROFILE_ROUTES : Routes = [
  { path: 'info', canActivate: [AuthGuard], component: ProfileInfoComponent },
  { path: 'password', canActivate: [AuthGuard], component: ProfilePasswordComponent },
  { path: 'picture', canActivate: [AuthGuard], component: ProfilePictureComponent},
  { path: '', canActivate: [AuthGuard], redirectTo: 'info' }
];

export const profileRouting = RouterModule.forChild(PROFILE_ROUTES);