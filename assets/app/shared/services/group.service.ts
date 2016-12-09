import { ApiService } from './api.service';
import { Group } from './../models/group.model';
import { Observable } from 'rxjs';
import { AppSettings } from './../../app.settings';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class GroupService {
    //Data
    private groups: Group[] = [];
    private projectId: string = '';

    //Events
    groupModalEvent = new EventEmitter<any>();
    deleteGroupEvent = new EventEmitter<Group>();
    
    constructor(private http: Http, 
        private apiService: ApiService) { }

    getGroups() {
        /*const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.get(`${AppSettings.API_ENDPOINT}project/${this.projectId}/group${token}`)
        .map((response: Response) => {
            const groups = response.json().obj.groups;
            let transformedGroups: Group[] = [];
            for (let group of groups) {
                transformedGroups.push(new Group(group.name, group._id, group.rank, group.active, []));
            }
            this.groups = transformedGroups;
            return transformedGroups;
        }).catch((error: Response) => {
            return Observable.throw(error.json());
        });*/
        return this.apiService.get(`project/${this.projectId}/group`)
            .map(data => {
                const groups = data.obj.groups;
                let transformedGroups: Group[] = [];
                for (let group of groups) {
                    transformedGroups.push(new Group(group.name, group._id, group.rank, group.active, []));
                }
                this.groups = transformedGroups;
                return transformedGroups;  
            });
    } 

    saveGroup(group: Group) {
        return this.apiService.post(`project/${this.projectId}/group`, group)
            .map(data => {
                const group = new Group(data.obj.name, data.obj._id, data.obj.rank, true, []);
                this.groups.push(group);
                return data;
            });
    }

    updateGroup(group: Group) {
        return this.apiService.patch(`project/${this.projectId}/group/${group.id}`, group);
    }

    deleteGroup(group: Group) {
        return this.apiService.delete(`project/${this.projectId}/group/${group.id}`)
            .map(data => { 
                this.groups.splice(this.groups.indexOf(group), 1);
                return data;
            });
    }

    setProjectId(id: string) {
        this.projectId = id;
    }

    getProjectId(): string {
        return this.projectId;
    }
}