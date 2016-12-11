import { MenuSettingComponent } from './../menu/menu-setting/menu-setting.component';
import { MenuTitleComponent } from './../shared/menu/menu-title/menu-title.component';
import { MenuComponent } from './../menu/menu.component';
import { DropdownComponent } from './../shared/dropdown/dropdown.component';
import { ProjectResolver } from './project-resolver';
import { GroupItemComponent } from './group/group-item/group-item.component';
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
    GroupItemComponent,
  
    MenuComponent,
    DropdownComponent
  ],
  imports: [
    SharedModule,
    projectRoutes
  ],
  providers: [
    ProjectResolver
  ]
})
export class ProjectModule { }