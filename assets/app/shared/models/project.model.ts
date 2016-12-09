export class Project {
    id: string;
    name: string;
    descripiton: string;
    date: string;
    creator: string;
    users: any[];
    groups: any[];

    constructor(name: string, description?: string, id?: string, date?: string, creator?: string,users?: any[]) {}
}

/*
    name: {type: String, required: true},
    description: {type: String},
    date: {type: Date, default: Date.now},
    creator: {type: Schema.Types.ObjectId, ref: 'User'},
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    groups: [{type: Schema.Types.ObjectId, ref: 'Group'}]
*/