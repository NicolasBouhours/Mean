import { RouterModule, Routes } from '@angular/router';

import { AuthenticationComponent } from './auth/authentication.component';
import { MessagesComponent } from './messages/messages.component';
import { SignupComponent } from './auth/signup.component';
import { SigninComponent } from './auth/signin.component';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/messages', pathMatch: 'full' },
    { path: 'messages', component: MessagesComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);