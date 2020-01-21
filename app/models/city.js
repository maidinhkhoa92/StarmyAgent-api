const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp-plugin");
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  banner: String
});

schema.plugin(timestamp, {
  createdName: "created_at",
  updatedName: "updated_at",
  disableCreated: false,
  disableUpdated: false
}).plugin(mongoosePaginate);

module.exports = mongoose.model("city", schema);
