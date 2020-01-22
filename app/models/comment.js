const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp-plugin');
const Schema = mongoose.Schema;

const schema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: String,
	date: Date,
	lName: String,
	fName: String,
	agent: { type: Schema.Types.ObjectId, ref: "user" },
	property: { type: Schema.Types.ObjectId, ref: "property" },
	rate: {
		sum: Number,
		options: Array
	},
	type: {
		type: String,
		enum: ['Seller', 'Buyer', 'Renter', 'Tenant'],
		required: true
	},
})

schema.plugin(timestamp, {
	createdName: 'created_at',
	updatedName: 'updated_at',
	disableCreated: false,
	disableUpdated: false
});

const user = mongoose.model('comment', schema);

module.exports = user;
