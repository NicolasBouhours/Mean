import { Task } from './task.model';
export class Group {
    constructor(public name: string, public id?: string, public rank?: number, public active?: boolean, public tasks?: Task[]) {}
}