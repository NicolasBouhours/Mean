import { HomeComponent } from './core/home/home.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { SigninComponent } from './auth/signin.component';
import { RouterModule, Routes } from '@angular/router';

import { MessagesComponent } from './messages/messages.component';


const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'messages', component: MessagesComponent },
    { path: 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);