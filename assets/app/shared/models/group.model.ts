import { Task } from './task.model';
export class Group {
    id: string;
    name: string;
    date: string;
    active: boolean;
    creator: string;
    deleter: string;
    project: any;
    tasks: any[];

    constructor(name: string, id?: string, rank?: number, active?: boolean, tasks?: Task[]) {
    }
}