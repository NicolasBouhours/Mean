import { GroupItemComponent } from './group/group-item/group-item.component';
import { GroupModalComponent } from './group/group-modal/group-modal.component';
import { GroupContainerComponent } from './group/group-container/group-container.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { projectRoutes } from './project.routing';
import { ProjectContainerComponent } from './project-container/project-container.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { ProjectModalComponent } from './project-modal/project-modal.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectConfirmDeleteComponent } from './project-confirm-delete/project-confirm-delete.component';

@NgModule({
  declarations: [
    ProjectContainerComponent,
    ProjectListComponent,
    ProjectItemComponent,
    ProjectModalComponent,
    ProjectConfirmDeleteComponent,
    ProjectDetailComponent,

    GroupContainerComponent,
    GroupModalComponent,
    GroupItemComponent
  ],
  imports: [
    SharedModule,
    projectRoutes
  ],
})
export class ProjectModule { }