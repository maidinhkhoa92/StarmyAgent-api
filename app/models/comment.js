const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp-plugin');
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const schema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: { type: String, default: ''},
	date: Date,
	lName: { type: String, default: ''},
	fName: { type: String, default: ''},
	email: { type: String, default: ''},
	agent: { type: Schema.Types.ObjectId, ref: "user" },
	property: { type: Schema.Types.ObjectId, ref: "property" },
	rate: {
		sum: Number,
		options: { type: Array, default: [0,0,0,0,0]}
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
}).plugin(mongoosePaginate);

const user = mongoose.model('comment', schema);

module.exports = user;
