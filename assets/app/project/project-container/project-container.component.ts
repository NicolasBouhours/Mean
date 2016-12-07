import { NotificationService } from './../../shared/notification/notification.service';
import { Project } from './../project.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-project-container',
  templateUrl: './project-container.component.html',
  styleUrls: ['./project-container.component.css']
})
export class ProjectContainerComponent {
    isModalActive: string = '';

    onOpenModal() {
      this.isModalActive = 'is-active';
    }

    onCloseModal() {
      this.isModalActive = '';
    }

}