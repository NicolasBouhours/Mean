import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { routing } from './app.routing';

import { ErrorService } from './errors/error.service';
import { AuthService } from './auth/auth.service';

import { MessageModule } from './messages/message.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from "./app.component";
import { AuthenticationComponent } from './auth/authentication.component';
import { HeaderComponent } from './header.component';
import { ErrorComponent } from './errors/error.component';
import { SignupComponent } from './auth/signup.component';
import { LogoutComponent } from './auth/logout.component';
import { SigninComponent } from './auth/signin.component';

@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        HeaderComponent,
        ErrorComponent,
        SignupComponent,
        SigninComponent,
        LogoutComponent
    ],
    imports: [
        BrowserModule, 
        routing, 
        ReactiveFormsModule,
        HttpModule,
        MessageModule
    ],
    providers: [AuthService, ErrorService],
    bootstrap: [AppComponent]
})
export class AppModule {

}