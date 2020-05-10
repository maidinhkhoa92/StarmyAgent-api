const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp-plugin');
const Schema = mongoose.Schema;

const schema = new Schema({
	email: {
		type: String,
		unique: true
	},
	password: String,
})

schema.plugin(timestamp, {
	createdName: 'created_at',
	updatedName: 'updated_at',
	disableCreated: false,
	disableUpdated: false
});

const user = mongoose.model('admin', schema);

module.exports = user;
