import { ProjectService } from './../project.service';
import { Project } from './../project.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent {
  @Input() project: Project;

  constructor(private projectService: ProjectService) {}

  onEditProject() {
      this.projectService.projectModalEvent.emit({
        isOpen: true,
        isAdd: false,
        project: this.project
      });
  }

  onDeleteProject() {
    this.projectService.deleteProjectEvent.emit(this.project);
  }

  belongToUser() {
      return this.project.creator === localStorage.getItem('userId');
  }
}