import { RouterModule } from '@angular/router';
import { ProjectContainerComponent } from './project-container/project-container.component';

const PROJECT_ROUTES = [
    { path: '', component: ProjectContainerComponent }
]

export const projectRoutes = RouterModule.forChild(PROJECT_ROUTES);