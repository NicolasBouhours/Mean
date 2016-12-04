import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin.component';
import { SignupComponent } from './signup.component';


const AUTH_ROUTES: Routes = [
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: '', component: SigninComponent },
];

export const authRouting  = RouterModule.forChild(AUTH_ROUTES);