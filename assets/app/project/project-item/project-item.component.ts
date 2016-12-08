import { Router } from '@angular/router';
import { ProjectService } from './../project.service';
import { Project } from './../project.model';
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
    this.router.navigate(['/project', this.project.id]);
  }

  belongToUser() {
      return this.project.creator === localStorage.getItem('userId');
  }
}