const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp-plugin");
const Schema = mongoose.Schema;

const schema = new Schema({
  numberOfAgent: Number,
  period: {
    type: String,
    enum: ["Annual", "Monthly"],
    required: true,
    default: "Annual"
  },
  amountDiscount: Number,
  discountPerPeriod: Number,
  total: Number,
  paymentMethod: {
    type: String,
    enum: ["Transfer", "Credit card"],
    required: true,
    default: "Transfer"
  },
  user: { type: Schema.Types.ObjectId, ref: "user" }
});

schema.plugin(timestamp, {
  createdName: "created_at",
  updatedName: "updated_at",
  disableCreated: false,
  disableUpdated: false
});

module.exports = mongoose.model("payment", schema);
