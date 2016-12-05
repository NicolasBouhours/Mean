import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';


const AUTH_ROUTES: Routes = [
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'forgot', component: ForgotComponent },
    { path: 'reset/:token', component: ResetComponent},
    { path: '', component: SigninComponent }
];

export const authRouting  = RouterModule.forChild(AUTH_ROUTES);