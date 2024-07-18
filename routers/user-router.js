const express = require("express");
const User = require("../models/User");
const Subscriber = require("../models/Subscriber");
const router = express.Router();
const webPush = require("web-push");

const jwt = require("jsonwebtoken");

require("dotenv").config();

webPush.setVapidDetails(
  `mailto:${process.env.EMAIL}`,
  process.env.VAPID_PUBLIC,
  process.env.VAPID_PRIVATE
);

router.put("/subscribe", async (req, res) => {
  try {
    const { id, subscription } = req.body;

    const subscriberData = {
      userId: id,
      subscription: subscription,
    };

    const subscriber = await Subscriber.create(subscriberData);

    const user = await User.findByIdAndUpdate(
      id,
      { subscription: subscriber._id },
      {
        new: true,
      }
    );

    res.status(200).json(`The user ${user.username} subscribes successfully!`);
  } catch (error) {
    console.log(`There are errors of subscription: ${error}`);
  }
});

router.get("/sendNotification", async (req, res) => {
  try {
    //const subscriber = await Subscriber.findOne({ userId: req.query.userId });
    let Today;

    const d = new Date();
    if (d.getMonth() + 1 < 10) {
      Today = `${d.getFullYear()}-0${d.getMonth() + 1}-${d.getDate()}`;
    } else {
      Today = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }

    console.log(Today);

    const subscribers = await Subscriber.find().populate({
      path: "userId",
      populate: {
        path: "todos",
        models: "Todo",
      },
    });

    subscribers.forEach((subscriber) => {
      const subscription = subscriber.subscription;
      const username = subscriber.userId.username;
      const todos = subscriber.userId.todos.filter((todo) => {
        let d = todo.startTime;
        let fullDate;

        if (d.getMonth() + 1 < 10) {
          fullDate = `${d.getFullYear()}-0${d.getMonth() + 1}-${d.getDate()}`;
        } else {
          fullDate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        }

        return fullDate === Today;
      });
      var text = "";

      todos.forEach((task) => {
        text += `${task.title}\n`;
      });

      webPush
        .sendNotification(
          subscription,
          JSON.stringify({
            title: `The task of ${username} on ${Today}`,
            text: text,
          })
        )
        .catch((err) => {
          console.log(`Error occurred: ${err}`);
        });
    });

    res.status(202).json({ message: "A push message is sent successfully!" });
  } catch (error) {
    console.log(`Error in pushing notification: ${error}`);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const found = await User.findOne({ username: req.body.username });
    if (found) {
      return res.status(200).json({ message: "The username is already used!" });
    }

    const user = await User.create(req.body);

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ user: user, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error!" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({ message: "invalid username or password!" });
    }

    const isPwd = await user.isPassword(password);

    if (!isPwd) {
      return res.status(401).json({ message: "invalid username or password!" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.json({ user: user, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error!" });
  }
});

module.exports = router;
