const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const User = require("../models/User");
const Subscriber = require("../models/Subscriber");
const webPush = require("web-push");
const dayjs = require("dayjs");

webPush.setVapidDetails(
  `mailto:${process.env.EMAIL}`,
  process.env.VAPID_PUBLIC,
  process.env.VAPID_PRIVATE
);

router.post("/subscribe", async (req, res) => {
  try {
    const { id, subscription } = req.body;

    const subscriberData = {
      userId: id,
      subscription: subscription,
    };

    let prevSubscriber;
    let subscriber;
    let user;

    try {
      prevSubscriber = await Subscriber.findOne({ userId: id });
    } catch (err) {
      console.error(`Problem in find prevSubscriber: ${err}.`);
    }

    if (prevSubscriber) {
      try {
        subscriber = await Subscriber.findByIdAndUpdate(
          prevSubscriber._id,
          { subscription: subscription },
          { new: true }
        );
      } catch (err) {
        console.error(`Problem in update Subscriber: ${err}.`);
      }
    } else {
      try {
        subscriber = await Subscriber.create(subscriberData);
      } catch (err) {
        console.error(`Problem in create Subscriber: ${err}.`);
      }
    }

    try {
      user = await User.findByIdAndUpdate(
        id,
        {
          subscription: subscriber._id,
        },
        { new: true }
      );
    } catch (err) {
      console.error(`Problem in update user: ${err}.`);
    }

    res.status(200).json({
      message: `the pushSubscription for user ${user.username} is updated.`,
    });
  } catch (err) {
    res.status(400).json({
      message: `some error happened in the resubscription: ${err}.`,
    });
  }
});

router.get("/pushNotification", async (res, req) => {
  try {
    const today = dayjs().format("YYYY-MM-DD");

    const subscribers = await Subscriber.find()
      .populate({
        path: "userId",
        populate: {
          path: "todos",
          models: "Todo",
        },
      })
      .populate({
        path: "userId",
        populate: {
          path: "patterns",
          models: "Pattern",
        },
      });

    subscribers.forEach((subscriber) => {
      const username = subscriber.userId.username;
      const subscription = subscriber.subscription;

      const todos = subscriber.userId.todos.filter((todo) => {
        const startTime = todo.startTime;

        return todo.dates.includes(today);
      });

      const patterns = subscriber.userId.patterns.filter((pattern) => {
        const startTime = `${today}T${dayjs(pattern.startTime).format(
          "HH:mm"
        )}`;
        return (
          pattern.dates.includes(today) &&
          dayjs(startTime).diff(dayjs(), "minute") <= 120 &&
          dayjs(startTime).diff(dayjs(), "minute") >= 0
        );
      });

      arrOfTasks = [...todos, ...patterns];

      if (arrOfTasks.length) {
        arrOfTasks.forEach((task) => {
          if (task.notification) {
            webPush
              .sendNotification(
                subscription,
                JSON.stringify({
                  title: `The task of ${username} at ${dayjs(
                    task.startTime
                  ).format("HH:mm")} on ${today}`,
                  text: task.title,
                  id: task._id,
                  startDate: task.startDate ? task.startDate : "",
                })
              )
              .catch((err) => {
                console.log(`Error occurred: ${err}`);
              });
          }
        });
      }
    });
  } catch (error) {
    console.log(`Error in pushing notification: ${error}`);
  }
});

router.put("/resubscribe", async (res, req) => {
  try {
    const userId = req.body.userId;

    await Subscriber.deleteOne({ userId: userId });

    await User.findByIdAndUpdate(userId, { subscription: null }, { new: true });
  } catch (err) {
    console.log(`Error in unsubscribing: ${err}`);
  }
});

module.exports = router;
