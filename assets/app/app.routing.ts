import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { ProfileContainerComponent } from './profile/container/profile-container.component';
import { CanActivateViaAuthGuard } from './auth/auth.guard';


const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule' },
    { path: 'profile', component: ProfileContainerComponent, canActivate: [CanActivateViaAuthGuard], loadChildren: './profile/profile.module#ProfileModule' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);