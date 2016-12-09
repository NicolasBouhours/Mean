import { ApiService } from './api.service';
import { Project } from './../models/project.model';
import { AppSettings } from './../../app.settings';
import { Observable } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProjectService {
    //Data
    private projects: Project[] = [];

    //Events
    projectModalEvent = new EventEmitter<any>();
    deleteProjectEvent = new EventEmitter<Project>();
    
    constructor(private http: Http,
        private apiService: ApiService) { }

    getProjects() {
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.apiService.get('project')
            .map(data => {
                this.projects = data.obj.projects;
                return this.projects;
            });
    }

    saveProject(project: Project) {
        return this.apiService.post('project', project)
            .map(data => {
                    this.projects.push(new Project(data));
                    return data;
                }
            );
    }

    updateProject(project: Project) {
        return this.apiService.patch(`project/${project.id}`, project);
    }

    deleteProject(project: Project) {
        return this.apiService.delete(`project/${project.id}`)
            .map(data => {
                this.projects.splice(this.projects.indexOf(project), 1);
                return data;
            });
    }
}