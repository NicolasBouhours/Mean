import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';

import { authRouting } from './auth.routing';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';

@NgModule({
    declarations: [
        SigninComponent,
        SignupComponent,
        ForgotComponent,
        ResetComponent
    ],
    imports: [
        SharedModule,
        authRouting
    ]
})
export class AuthModule { }