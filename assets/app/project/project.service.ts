import { Observable } from 'rxjs';
import { AppSettings } from './../app.settings';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Project } from './project.model';

@Injectable()
export class ProjectService {
    //Data
    private projects: Project[] = [];

    //Events
    projectModalEvent = new EventEmitter<any>();
    deleteProjectEvent = new EventEmitter<Project>();
    
    constructor(private http: Http) { }

    getProjects() {
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.get(`${AppSettings.API_ENDPOINT}project${token}`)
        .map((response: Response) => {
            const projects = response.json().obj.projects;
            let transformedProjects: Project[] = [];
            for (let project of projects) {
                transformedProjects.push(new Project(project.name, project.description, project._id, project.date, project.users));
            }
            this.projects = transformedProjects;
            return transformedProjects;
        }).catch((error: Response) => {
            return Observable.throw(error.json());
        });
    }

    saveProject(project: Project) {
        const body = JSON.stringify(project);
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(`${AppSettings.API_ENDPOINT}project${token}`, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const project = new Project(result.obj.name, result.obj.description, result.obj._id, result.obj.date, [{}]);
                this.projects.push(project);
                return result;
            })
            .catch((error: Response) => {
                return Observable.throw(error.json());
        });
    }

    updateProject(project: Project) {
        const body = JSON.stringify(project);
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.patch(`${AppSettings.API_ENDPOINT}project/${project.id}${token}`, body, {headers: headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: Response) => {
                return Observable.throw(error.json());
        });
    }

    deleteProject(project: Project) {
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.delete(`${AppSettings.API_ENDPOINT}project/${project.id}${token}`)
            .map((response: Response) => {
                const result = response.json();
                this.projects.splice(this.projects.indexOf(project), 1);
                return result;
            })
            .catch((error: Response) => {
                return Observable.throw(error.json());
        });
    }
}