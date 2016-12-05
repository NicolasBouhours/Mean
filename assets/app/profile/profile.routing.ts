import { Routes, RouterModule } from '@angular/router';

import { ProfileInfoComponent } from './profile-info.component';
import { ProfileContainerComponent } from './profile-container.component';
import { ProfilePasswordComponent } from './profile-password.component';

const PROFILE_ROUTES : Routes = [
  { path: '', redirectTo: 'info' },
  { path: 'info', component: ProfileInfoComponent },
  { path: 'password',component: ProfilePasswordComponent }
];

export const profileRouting = RouterModule.forChild(PROFILE_ROUTES);