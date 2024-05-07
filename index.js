const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");

require("dotenv").config(); //for using the variable in .env

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("MongoDB is connected!");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
