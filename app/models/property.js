const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp-plugin");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: { type: String, default: "" },
  price: { type: Number, default: 0 },
  type: {
    type: String,
    enum: ["rent", "sale"],
    required: true,
    default: "rent"
  },
  bedRoom: { type: Number, default: 0 },
  bathRoom: { type: Number, default: 0 },
  area: { type: Number, default: 0 },
  city: { type: Schema.Types.ObjectId, ref: "city" },
  district: { type: Schema.Types.ObjectId, ref: "district" },
  photo: { type: Array, default: [] },
  agent: { type: Schema.Types.ObjectId, ref: "user" },
  disabled: {
    type: Boolean,
    required: true,
    default: true
  },
});

schema
  .plugin(timestamp, {
    createdName: "created_at",
    updatedName: "updated_at",
    disableCreated: false,
    disableUpdated: false
  })
  .plugin(mongoosePaginate);

const user = mongoose.model("property", schema);

module.exports = user;
