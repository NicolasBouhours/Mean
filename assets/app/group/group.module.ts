import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { groupRoutes } from './group.routing';
import { GroupService } from './group.service';
import { GroupContainerComponent } from './group-container/group-container.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { GroupModalComponent } from './group-modal/group-modal.component';
import { GroupListComponent } from './group-list/group-list.component';


@NgModule({
  declarations: [
    GroupContainerComponent,
    GroupListComponent,
    GroupModalComponent,
    GroupDetailComponent    
  ],
  imports: [
    SharedModule,
    groupRoutes
  ],
})
export class GroupModule { }