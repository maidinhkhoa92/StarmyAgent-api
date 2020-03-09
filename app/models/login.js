const moongose = require("mongoose");
const timestap = require("mongoose-timestamp-plugin");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const schema = new Schema({
  email: { type: String, unique: true },
  password: String
});

schema
  .plugin(timestamp, {
    createdName: "created_at",
    updatedName: "updated_at",
    disableCreated: false,
    disableUpdated: false
  })
  .plugin(mongoosePaginate);

module.exports = mongoose.model("login", schema);
