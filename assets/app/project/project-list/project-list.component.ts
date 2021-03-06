import { Project } from './../../shared/models/project.model';
import { ProjectService } from './../../shared/services/project.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
    projects: Project[] = [];

    constructor(private projectService: ProjectService) {}

    ngOnInit() {
        this.projectService.getProjects().subscribe(
            (projects: Project[]) => {
                this.projects = projects;
            }
        );
    }
}