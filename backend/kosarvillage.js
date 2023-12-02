const express = require("express");

const app = express();

const dbConfig = require("./dbmongose");

const keluhansRoute = require("./routes/keluhansRoute");
const penggunasRoute = require("./routes/penggunasRoute");
const driversRoute = require("./routes/driversRoute");

app.use(express.json());

app.use("/api/keluhans", keluhansRoute);
app.use("/api/penggunas", penggunasRoute);
app.use("/api/drivers", driversRoute);

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log("Server Kosar Village is running on port", port)
);
