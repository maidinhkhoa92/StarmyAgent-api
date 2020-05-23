const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp-plugin');
const Schema = mongoose.Schema;

const schema = new Schema({
	city: { type: String, default: '', required: true },
	district: [
        {
            name: { type: String, default: '', required: true },
            sale: { type: Number, default: 0, required: true },
            rent: { type: Number, default: 0, required: true }
        }
    ]
})

schema.plugin(timestamp, {
	createdName: 'created_at',
	updatedName: 'updated_at',
	disableCreated: false,
	disableUpdated: false
});

const user = mongoose.model('calculated_data', schema);

module.exports = user;
