import { Project } from './../../shared/models/project.model';
import { ProjectService } from './../../shared/services/project.service';
import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent {
  @Input() project: Project;

  constructor(private projectService: ProjectService,
    private router: Router) {}

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

  onDetail() {
    this.projectService.setSelectedProject(this.project);
    this.router.navigate(['/project', this.project._id]);
  }

  belongToUser() {
      return this.project.creator === localStorage.getItem('userId');
  }
}