const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

var mongoURL =
  "mongodb+srv://kosarvillage:kosarvillage@cluster0.93sie2d.mongodb.net/testing";

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var connection = mongoose.connection;

connection.on("error", () => {
  console.log("Mongo DB Connection Failed");
});

connection.on("connected", () => {
  console.log("Mongo DB Connection Sucess");
});

module.exports = mongoose;
