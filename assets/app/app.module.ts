import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { routing } from './app.routing';

import { NotificationService } from './notification/notification.service';
import { ErrorService } from './errors/error.service';
import { AuthService } from './auth/auth.service';

import { CoreModule } from './core/core.module';
import { MessageModule } from './messages/message.module';

import { AppComponent } from "./app.component";
import { HeaderComponent } from './header/header.component';
import { ErrorComponent } from './errors/error.component';
import { NotificationComponent } from './notification/notification.component';
import { AuthenticationComponent } from './auth/authentication.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ErrorComponent,
        NotificationComponent,
        AuthenticationComponent
    ],
    imports: [
        BrowserModule, 
        routing, 
        ReactiveFormsModule,
        HttpModule,
        MessageModule,
        CoreModule
    ],
    providers: [AuthService, ErrorService, NotificationService],
    bootstrap: [AppComponent]
})
export class AppModule {

}