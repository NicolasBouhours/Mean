let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let User = require('./user');

let schema = new Schema({
    name: {type: String, required: true},
    date: {type: Date, default: Date.now},
    creator: {type: Schema.Types.ObjectId, ref: 'User'},
    users: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Group', schema);