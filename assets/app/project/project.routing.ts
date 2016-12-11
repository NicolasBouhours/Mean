import { ProjectResolver } from './project-resolver';
import { AuthGuard } from './../shared/guards/auth.guard';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { RouterModule, CanActivate } from '@angular/router';
import { ProjectContainerComponent } from './project-container/project-container.component';

const PROJECT_ROUTES = [
    { 
        path: ':id', 
        CanActivate: [AuthGuard], 
        component: ProjectDetailComponent ,
        loadChildren: './../menu/menu.module#MenuModule',
        resolve: {
            project: ProjectResolver
        }
    },
    { 
        path: '', 
        CanActivate: [AuthGuard], 
        component: ProjectContainerComponent, 
        pathMatch: 'full' 
    }
]

export const projectRoutes = RouterModule.forChild(PROJECT_ROUTES);