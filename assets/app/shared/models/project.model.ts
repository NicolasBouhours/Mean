export class Project {
    constructor(public name: string, 
    public description?: string, 
    public id?: string, 
    public date?: string, 
    public creator?: string,
    public users?: any[]) {}
}