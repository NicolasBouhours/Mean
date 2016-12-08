import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { projectRoutes } from './project.routing';
import { ProjectService } from './project.service';
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
    ProjectConfirmDeleteComponent
  ],
  imports: [
    SharedModule,
    projectRoutes
  ],
})
export class ProjectModule { }