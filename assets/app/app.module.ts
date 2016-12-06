import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { routing } from './app.routing';

import { NotificationService } from './shared/notification/notification.service';
import { ErrorService } from './shared/errors/error.service';
import { AuthService } from './auth/auth.service';
import { CanActivateViaAuthGuard } from './auth/CanActivateViaAuthGuard';

import { CoreModule } from './core/core.module';
import { MessageModule } from './messages/message.module';

import { AppComponent } from "./app.component";
import { HeaderComponent } from './layout/header/header.component';
import { ErrorComponent } from './shared/errors/error.component';
import { NotificationComponent } from './shared/notification/notification.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { ProfileContainerComponent } from './profile/container/profile-container.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ErrorComponent,
        NotificationComponent,
        AuthenticationComponent,
        ProfileContainerComponent
    ],
    imports: [
        BrowserModule, 
        routing, 
        ReactiveFormsModule,
        HttpModule,
        MessageModule,
        CoreModule
    ],
    providers: [AuthService, ErrorService, NotificationService, CanActivateViaAuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {

}