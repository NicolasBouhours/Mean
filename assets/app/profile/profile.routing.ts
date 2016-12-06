import { Routes, RouterModule } from '@angular/router';

import { ProfileInfoComponent } from './info/profile-info.component';
import { ProfileContainerComponent } from './container/profile-container.component';
import { ProfilePasswordComponent } from './password/profile-password.component';

const PROFILE_ROUTES : Routes = [
  { path: '', redirectTo: 'info' },
  { path: 'info', component: ProfileInfoComponent },
  { path: 'password',component: ProfilePasswordComponent }
];

export const profileRouting = RouterModule.forChild(PROFILE_ROUTES);