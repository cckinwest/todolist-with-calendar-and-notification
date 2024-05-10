const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");
const userRouter = require("./routers/user-router");
const todoRouter = require("./routers/todo-router");

require("dotenv").config(); //for using the variable in .env

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("MongoDB is connected!");
});

app.use("/user", userRouter);
app.use("/todo", todoRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
