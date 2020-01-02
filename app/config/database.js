"use strict";

// Dependencies
const Mongoose = require("mongoose");

// Configurations
const APP_CONFIG = require("./APP_CONFIG");

Mongoose.connect(
  `mongodb+srv://${APP_CONFIG.database.username}:${APP_CONFIG.database.password}@${APP_CONFIG.database.host}/${APP_CONFIG.database.db}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

const db = Mongoose.connection;
db.on("error", console.error.bind(console, "Connection error"));
db.once("open", () => {
  console.log("Connection with database succeeded");
});

module.exports = db;
