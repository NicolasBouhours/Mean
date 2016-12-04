import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';

import { authRouting } from './auth.routing';

import { SigninComponent } from './signin.component';
import { SignupComponent } from './signup.component';

@NgModule({
    declarations: [
        SigninComponent,
        SignupComponent
    ],
    imports: [
        SharedModule,
        authRouting
    ]
})
export class AuthModule { }