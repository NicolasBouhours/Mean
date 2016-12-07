import { RouterModule } from '@angular/router';
import { GroupContainerComponent } from './group-container/group-container.component';

const GROUP_ROUTES = [
    { path: '', component: GroupContainerComponent }
]

export const groupRoutes = RouterModule.forChild(GROUP_ROUTES);