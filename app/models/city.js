const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp-plugin");
const Schema = mongoose.Schema;

const schema = new Schema({
  email: {
    type: String,
    unique: true
  },
  password: String,
  type: {
    type: String,
    enum: ["agent", "agency"],
    required: true,
    default: "agent"
  },
  agent: [{ type: Schema.Types.ObjectId, ref: "user" }],
  status: {
    type: Boolean,
    required: true,
    default: true
  }
});

schema.plugin(timestamp, {
  createdName: "created_at",
  updatedName: "updated_at",
  disableCreated: false,
  disableUpdated: false
});

const user = mongoose.model("user", schema);

module.exports = user;
