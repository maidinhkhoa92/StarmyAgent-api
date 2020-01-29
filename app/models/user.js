const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp-plugin");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const schema = new Schema({
  email: {
    type: String,
    unique: true
  },
  password: { type: String, default: "" },
  fName: { type: String, default: "" },
  lName: { type: String, default: "" },
  telephone: { type: String, default: "" },
  agency: { type: Schema.Types.ObjectId, ref: "user" },
  city: { type: Schema.Types.ObjectId, ref: "city" },
  card: Object,
  company: {
    owner: { type: String, default: "" },
    name: { type: String, default: "" },
    numberAgent: { type: Number, default: 0 }
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
  banner: { type: String, default: "" },
  photo: { type: String, default: "" },
  social: {
    website: { type: String, default: "" },
    facebook: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    twitter: { type: String, default: "" },
    youtube: { type: String, default: "" }
  },
  disabled: {
    type: Boolean,
    required: true,
    default: false
  },
  agentCertificateDate: { type: String, default: "" },
  languages: { type: Array, default: [] },
  services: { type: Array, default: [] },
  description: { type: String, default: "" }
});

schema
  .plugin(timestamp, {
    createdName: "created_at",
    updatedName: "updated_at",
    disableCreated: false,
    disableUpdated: false
  })
  .plugin(mongoosePaginate);

module.exports = mongoose.model("user", schema);
