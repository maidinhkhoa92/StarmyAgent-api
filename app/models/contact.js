const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp-plugin');
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const schema = new Schema({
	email: { type: String, required: true},
	lName: { type: String, default: ''},
    fName: { type: String, default: ''},
    telephone: { type: String, default: ''},
    message: { type: String, default: ''},
	agent: { type: Schema.Types.ObjectId, ref: "user" },
})

schema.plugin(timestamp, {
	createdName: 'created_at',
	updatedName: 'updated_at',
	disableCreated: false,
	disableUpdated: false
}).plugin(mongoosePaginate);

const user = mongoose.model('contact', schema);

module.exports = user;
