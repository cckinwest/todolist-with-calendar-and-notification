const express = require("express");
const app = express();
const port = 3001;

const mongoose = require("mongoose");
const userRouter = require("./routers/user-router");
const todoRouter = require("./routers/todo-router");
const verifyJWT = require("./middleware/middleware");

const schedule = require("node-schedule");
const axios = require("axios");

var cors = require("cors");

app.use(cors());

require("dotenv").config(); //for using the variable in .env

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("MongoDB is connected!");
});

app.use("/user", userRouter);
app.use("/todo", todoRouter);

app.get("/decode", verifyJWT, (req, res) => {
  const { username } = req.user;
  console.log(`${username} is logged in!`);
  res.json({ username });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});

const job = schedule.scheduleJob("0 0 * * *", () => {
  //console.log("Print this sentence every 2 minutes. Time: ", Date.now());
  axios.get("http://localhost:3001/user/sendNotification").then(
    (res) => {
      //console.log(res);
      console.log("The notification is pushed successfully.");
    },
    (err) => {
      console.log(`There is an error: ${err}`);
    }
  );
});
