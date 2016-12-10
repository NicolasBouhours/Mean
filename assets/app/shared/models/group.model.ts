import { Task } from './task.model';
export class Group {
    _id: string;
    name: string;
    date: string;
    active: boolean;
    creator: string;
    deleter: string;
    project: any;
    tasks: any[];

    constructor(name: string, _id?: string, rank?: number, active?: boolean, tasks?: Task[]) {
    }
}