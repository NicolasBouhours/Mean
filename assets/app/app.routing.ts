import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { MessagesComponent } from './messages/messages.component';
import { ProfileContainerComponent } from './profile/profile-container.component';


const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'messages', component: MessagesComponent },
    { path: 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule' },
    { path: 'profile', component: ProfileContainerComponent, loadChildren: './profile/profile.module#ProfileModule' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);