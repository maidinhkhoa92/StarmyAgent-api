const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp-plugin");
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  price: Number,
  type: {
    type: String,
    enum: ["rent", "sale"],
    required: true,
    default: "rent"
  },
  bedRoom: Number,
  bathRoom: Number,
  area: Number,
  city: { type: Schema.Types.ObjectId, ref: "city" },
  district: Number
});

schema.plugin(timestamp, {
  createdName: "created_at",
  updatedName: "updated_at",
  disableCreated: false,
  disableUpdated: false
});

const user = mongoose.model("user", schema);

module.exports = user;
