const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp-plugin");
const Schema = mongoose.Schema;

const schema = new Schema({
  email: {
    type: String,
    unique: true
  },
  password: String,
  fName: String,
  lName: String,
  telephone: String,
  agency: { type: Schema.Types.ObjectId, ref: "user" },
  city: { type: Schema.Types.ObjectId, ref: "city" },
  card: {
    type: String,
    number: Number,
    expired: String,
    code: Number
  },
  company: {
    owner: String,
    name: String,
    numberAgent: Number
  },
  type: {
    type: String,
    enum: ["agent", "agency"],
    required: true,
    default: "agent"
  },
  status: {
    type: Boolean,
    required: true,
    default: true
  },
  banner: String,
  photo: String,
  social: {
    website: String,
    facebook: String,
    linkedin: String,
    twitter: String,
    youtube: String
  },
  disabled: {
    type: Boolean,
    required: true,
    default: false
  },
});

schema.plugin(timestamp, {
  createdName: "created_at",
  updatedName: "updated_at",
  disableCreated: false,
  disableUpdated: false
});

module.exports = mongoose.model("user", schema);
