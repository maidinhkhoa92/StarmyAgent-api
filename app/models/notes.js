const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp-plugin');
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const schema = new Schema({
    msg: { type: String, default: ''},
    agency: { type: Schema.Types.ObjectId, ref: "user" },
});

schema
  .plugin(timestamp, {
    createdName: "created_at",
    updatedName: "updated_at",
    disableCreated: false,
    disableUpdated: false
  })
  .plugin(mongoosePaginate);

module.exports = mongoose.model("notes", schema);
