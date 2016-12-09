import { Project } from './../../shared/models/project.model';
import { ProjectService } from './../../shared/services/project.service';
import { NotificationService } from './../../shared/notification/notification.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-confirm-delete',
  templateUrl: './project-confirm-delete.component.html'
})
export class ProjectConfirmDeleteComponent implements OnInit {

  modalClass: string = '';
  project: Project = new Project('');

  constructor(private projectService: ProjectService,
    private notificationService: NotificationService) {}

    ngOnInit() {
      this.projectService.deleteProjectEvent.subscribe(
        (project: Project) => {
          this.project = project;
          this.modalClass = 'modal is-active';
        }
      );
    }

    onClose() {
      this.modalClass = 'modal';
    }

    onDeleteProject() {
      this.projectService.deleteProject(this.project).subscribe(
        (data) => {
          this.project = new Project('');
          this.onClose();
          this.notificationService.handleNotification(data.message, 'primary');
          console.log('handle notif');
        },
        (error) => this.notificationService.handleNotification(error.title, 'danger')
      );
    }
}