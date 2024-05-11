const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");
const userRouter = require("./routers/user-router");
const todoRouter = require("./routers/todo-router");
const verifyJWT = require("./middleware/middleware");

require("dotenv").config(); //for using the variable in .env

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("MongoDB is connected!");
});

app.use("/user", userRouter);
app.use("/todo", todoRouter);

app.get("/decode", verifyJWT, (req, res) => {
  const { username } = req.user;
  res.json({ username });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
