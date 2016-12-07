import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { projectRoutes } from './project.routing';
import { ProjectService } from './project.service';
import { ProjectContainerComponent } from './project-container/project-container.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectModalComponent } from './project-modal/project-modal.component';
import { ProjectListComponent } from './project-list/project-list.component';


@NgModule({
  declarations: [
    ProjectContainerComponent,
    ProjectListComponent,
    ProjectDetailComponent,
    ProjectModalComponent,
    ProjectDetailComponent    
  ],
  imports: [
    SharedModule,
    projectRoutes
  ],
})
export class ProjectModule { }