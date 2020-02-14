const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp-plugin");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const schema = new Schema({
  type: {
    type: String,
    enum: ["street", "square", "avenue", "walk", "passage"],
    required: true,
    default: "street"
  },
  streetName: { type: String, default: "" },
  block: { type: String, default: "" },
  floor: { type: String, default: "" },
  postCode: { type: String, default: "" },
  city: { type: Schema.Types.ObjectId, ref: "city" },
  file: { type: String, default: "" },
  highlight: { type: Boolean, default: false},
  agent: { type: Schema.Types.ObjectId, ref: "user" }
});

schema
  .plugin(timestamp, {
    createdName: "created_at",
    updatedName: "updated_at",
    disableCreated: false,
    disableUpdated: false
  })
  .plugin(mongoosePaginate);

const user = mongoose.model("address", schema);

module.exports = user;
