let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
    name: {type: String, required: true},
    date: {type: Date, default: Date.now},
    active: {type: Boolean, default: true},
    creator: {type: Schema.Types.ObjectId, ref: 'User'},
    deleter: {type: Schema.Types.ObjectId, ref: 'User'},
    project: {type: Schema.Types.ObjectId, ref: 'Project'},
});

module.exports = mongoose.model('Group', schema);