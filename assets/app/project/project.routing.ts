import { CanActivateViaAuthGuard } from './../auth/auth.guard';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { RouterModule } from '@angular/router';
import { ProjectContainerComponent } from './project-container/project-container.component';

const PROJECT_ROUTES = [
    { path: ':id', component: ProjectDetailComponent },
    { path: '', component: ProjectContainerComponent, pathMatch: 'full' }
]

export const projectRoutes = RouterModule.forChild(PROJECT_ROUTES);