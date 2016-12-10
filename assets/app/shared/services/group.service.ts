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
        return this.apiService.get(`project/${this.projectId}/group`)
            .map(data => {
                this.groups = data.obj.groups;
                return this.groups;  
            });
    } 

    saveGroup(group: Group) {
        return this.apiService.post(`project/${this.projectId}/group`, group)
            .map(data => {
                this.groups.push(new Group(data.obj));
                return data;
            });
    }

    updateGroup(group: Group) {
        return this.apiService.patch(`project/${this.projectId}/group/${group._id}`, group);
    }

    deleteGroup(group: Group) {
        return this.apiService.delete(`project/${this.projectId}/group/${group._id}`)
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