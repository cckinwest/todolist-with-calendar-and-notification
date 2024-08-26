const express = require("express");
const app = express();
const port = 3002;

const mongoose = require("mongoose");
const userRouter = require("./routers/user-router");
const todoRouter = require("./routers/todo-router");
const patternRouter = require("./routers/pattern-router");
const subscriptionRouter = require("./routers/subscription-router");
const verifyJWT = require("./middleware/middleware");

const schedule = require("node-schedule");
const axios = require("axios");

const path = require("path");

var cors = require("cors");

app.use(express.static(path.join(__dirname, "client", "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

require("dotenv").config(); //for using the variable in .env

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("MongoDB is connected!");
});

app.use("/user", userRouter);
app.use("/todo", todoRouter);
app.use("/pattern", patternRouter);
app.use("/subscription", subscriptionRouter);

app.get("/decode", verifyJWT, (req, res) => {
  const { username } = req.user;
  console.log(`${username} is logged in!`);
  res.json({ username });
});
/*
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});*/

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});

const job = schedule.scheduleJob("0 0 * * *", () => {
  //console.log("Print this sentence every 2 minutes. Time: ", Date.now());
  axios.get("http://localhost:3002/subscription/pushNotification").then(
    (res) => {
      //console.log(res);
      console.log("The notification is pushed successfully.");
    },
    (err) => {
      console.log(`There is an error: ${err}`);
    }
  );
});
