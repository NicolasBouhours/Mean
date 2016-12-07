import { Routes, RouterModule } from '@angular/router';

import { ProfileInfoComponent } from './info/profile-info.component';
import { ProfileContainerComponent } from './container/profile-container.component';
import { ProfilePasswordComponent } from './password/profile-password.component';
import { ProfilePictureComponent } from './picture/profile-picture.component';

const PROFILE_ROUTES : Routes = [
  { path: '', redirectTo: 'info' },
  { path: 'info', component: ProfileInfoComponent },
  { path: 'password',component: ProfilePasswordComponent },
  { path: 'picture', component: ProfilePictureComponent}
];

export const profileRouting = RouterModule.forChild(PROFILE_ROUTES);