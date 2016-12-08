import { GroupService } from './project/group/group.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { routing } from './app.routing';

import { NotificationService } from './shared/notification/notification.service';
import { AuthService } from './auth/auth.service';
import { ProjectService } from './project/project.service';
import { CanActivateViaAuthGuard } from './auth/auth.guard';

import { CoreModule } from './core/core.module';

import { AppComponent } from "./app.component";
import { HeaderComponent } from './layout/header/header.component';
import { ProfileContainerComponent } from './profile/container/profile-container.component';
import { NotificationComponent } from './shared/notification/notification.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        NotificationComponent,
        ProfileContainerComponent
    ],
    imports: [
        BrowserModule, 
        routing, 
        ReactiveFormsModule,
        HttpModule,
        CoreModule
    ],
    providers: [AuthService, NotificationService, ProjectService, GroupService, CanActivateViaAuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {

}