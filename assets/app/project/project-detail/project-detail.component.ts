import { ProjectService } from './../../shared/services/project.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html'
})
export class ProjectDetailComponent implements OnInit {

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    
  }

}