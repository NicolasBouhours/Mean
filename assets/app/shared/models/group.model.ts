import { Task } from './task.model';
export class Group {
    _id: string;
    name: string;
    date: string;
    rank: number
    active: boolean;
    creator: string;
    deleter: string;
    project: any;
    tasks: any[];

    constructor(name: string, _id?: string, rank?: number, active?: boolean, tasks?: Task[]) {
        this.name = name;
        this._id = _id;
        this.rank = rank;
        this.active = active;
        this.tasks = tasks;
    }
}