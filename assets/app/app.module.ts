import { MenuService } from './menu/menu.service';
import { AuthGuard } from './shared/guards/auth.guard';
import { JwtService } from './shared/services/jwt.service';
import { ApiService } from './shared/services/api.service';
import { UploadService } from './shared/services/upload.service';
import { ProjectService } from './shared/services/project.service';
import { GroupService } from './shared/services/group.service';
import { AuthService } from './shared/services/auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { routing } from './app.routing';

import { NotificationService } from './shared/notification/notification.service';

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
    providers: [
        JwtService,
        ApiService,
        AuthService, 
        NotificationService, 
        ProjectService, 
        GroupService, 
        UploadService,
        MenuService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}