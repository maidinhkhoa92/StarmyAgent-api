const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp-plugin");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const schema = new Schema({
    requestSale: {
        type: Number,
        required: true,
        default: 0
    },
    requestRent: {
        type: Number,
        required: true,
        default: 0
    },
    offerSale: {
        type: Number,
        required: true,
        default: 0
    },
    offerRent: {
        type: Number,
        required: true,
        default: 0
    },
    date: {
        type: String,
        required: true,
        default: ''
    },
    user: { type: Schema.Types.ObjectId, ref: "user" },
});

schema
    .plugin(timestamp, {
        createdName: "created_at",
        updatedName: "updated_at",
        disableCreated: false,
        disableUpdated: false
    })
    .plugin(mongoosePaginate);

const user = mongoose.model("report", schema);

module.exports = user;
