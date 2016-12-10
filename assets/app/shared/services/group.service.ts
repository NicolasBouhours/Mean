import { ApiService } from './api.service';
import { Group } from './../models/group.model';
import { Observable } from 'rxjs';
import { AppSettings } from './../../app.settings';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class GroupService {

    projectId: string;
    
    //Events
    groupModalEvent = new EventEmitter<any>();
    deleteGroupEvent = new EventEmitter<Group>();
    
    constructor(private http: Http, 
        private apiService: ApiService) { }

    getGroups() {
        return this.apiService.get(`project/${this.projectId}/group`);
    } 

    saveGroup(group: Group) {
        return this.apiService.post(`project/${this.projectId}/group`, group);
    }

    updateGroup(group: Group) {
        return this.apiService.patch(`project/${this.projectId}/group/${group._id}`, group);
    }

    deleteGroup(group: Group) {
        return this.apiService.delete(`project/${this.projectId}/group/${group._id}`);
    }

    setProjectId(id: string) {
        this.projectId = id;
    }

    getProjectId(): string {
        return this.projectId;
    }
}