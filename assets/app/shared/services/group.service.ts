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
    
    constructor(private http: Http) { }

    getGroups() {
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
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
        });
    }

    saveGroup(group: Group) {
        const body = JSON.stringify(group);
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(`${AppSettings.API_ENDPOINT}project/${this.projectId}/group${token}`, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const group = new Group(result.obj.name, result.obj._id, result.obj.rank, true, []);
                this.groups.push(group);
                return result;
            })
            .catch((error: Response) => {
                return Observable.throw(error.json());
        });
    }

    updateGroup(group: Group) {
        const body = JSON.stringify(group);
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.patch(`${AppSettings.API_ENDPOINT}project/${this.projectId}/group/${group.id}${token}`, body, {headers: headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: Response) => {
                return Observable.throw(error.json());
        });
    }

    deleteGroup(group: Group) {
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.delete(`${AppSettings.API_ENDPOINT}project/${this.projectId}/group/${group.id}${token}`)
            .map((response: Response) => {
                const result = response.json();
                this.groups.splice(this.groups.indexOf(group), 1);
                return result;
            })
            .catch((error: Response) => {
                return Observable.throw(error.json());
        });
    }

    setProjectId(id: string) {
        this.projectId = id;
    }

    getProjectId(): string {
        return this.projectId;
    }
}