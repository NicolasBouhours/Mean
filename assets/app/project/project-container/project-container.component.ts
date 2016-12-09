import { ProjectService } from './../../shared/services/project.service';
import { NotificationService } from './../../shared/notification/notification.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-project-container',
  templateUrl: './project-container.component.html',
  styleUrls: ['./project-container.component.css']
})
export class ProjectContainerComponent {

  constructor(private projectService: ProjectService) {}

    onOpenModal() {
      this.projectService.projectModalEvent.emit({
        isOpen: true,
        isAdd: true
      });
    }


}