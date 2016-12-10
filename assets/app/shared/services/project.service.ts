import { NotificationService } from './../notification/notification.service';
import { Group } from './../models/group.model';
import { GroupService } from './group.service';
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
    private selectedProject: Project;

    //Events
    projectModalEvent = new EventEmitter<any>();
    deleteProjectEvent = new EventEmitter<Project>();
    
    constructor(private http: Http,
        private apiService: ApiService,
        private groupService: GroupService,
        private notificationService: NotificationService) { }

    getProjects() {
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.apiService.get('project')
            .map(data => {
                this.projects = data.obj.projects;
                return this.projects;
            });
    }

    getProject(id) {
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.apiService.get(`project/${id}`)
            .map(data => {
                this.selectedProject = data.obj;
                return this.selectedProject;
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
        return this.apiService.patch(`project/${project._id}`, project);
    }

    deleteProject(project: Project) {
        return this.apiService.delete(`project/${project._id}`)
            .map(data => {
                this.projects.splice(this.projects.indexOf(project), 1);
                return data;
            });
    }

    setSelectedProject(project: any) {
        this.selectedProject = project;
    }

    getSelectedProject() {
        return this.selectedProject;
    }


    // GROUP Methods
    addGroup(group: Group) {
        this.groupService.saveGroup(group).subscribe(
            (data) => this.selectedProject.groups.push(data.obj),
            (error) => this.notificationService.handleNotification(error.title, 'danger')
        );
    }
}