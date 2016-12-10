import { ActivatedRoute } from '@angular/router';
import { Project } from './../../shared/models/project.model';
import { ProjectService } from './../../shared/services/project.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html'
})
export class ProjectDetailComponent implements OnInit {
  
  project: Project;

  constructor(private projectService: ProjectService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(
      (data: {project: Project}) => {
        this.project = data.project;
      }
    );
  }

}