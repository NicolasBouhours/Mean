import { Group } from './group.model';
export class Project {
    _id: string;
    name: string;
    description: string;
    date: string;
    creator: string;
    users: any[];
    groups: Group[];

    constructor(name: string, description?: string, _id?: string, date?: string, creator?: string,users?: any[]) {}
}