import { RouterModule, Routes } from '@angular/router';

import { AuthenticationComponent } from './auth/authentication.component';
import { MessagesComponent } from './messages/messages.component';
import { SignupComponent } from './auth/signup.component';
import { LogoutComponent } from './auth/logout.component';
import { SigninComponent } from './auth/signin.component';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/messages', pathMatch: 'full' },
    { path: 'messages', component: MessagesComponent },
    /*{ path: 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule'}*/
    { path: 'signin', component: SigninComponent },
    { path: 'logout', component:LogoutComponent },
    { path: 'signup', component: SignupComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);