import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { CanActivateViaAuthGuard } from './auth/auth.guard';


const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
    { path: 'profile', canActivate: [CanActivateViaAuthGuard], loadChildren: './profile/profile.module#ProfileModule' },
    { path: 'project', canActivate: [CanActivateViaAuthGuard], loadChildren: './project/project.module#ProjectModule'}
];

export const routing = RouterModule.forRoot(APP_ROUTES);