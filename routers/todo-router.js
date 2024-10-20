const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.query.username }).populate({
      path: "todos",
      select: "-__v",
    });

    res.status(200).json(user.todos);
  } catch (error) {
    res.status(500).json({ message: "internal server error!" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const todos = await Todo.find();

    res.status(200).json(todos);
  } catch (err) {
    console.log({ error: err });
  }
});

router.post("/create", async (req, res) => {
  try {
    const {
      title,
      description,
      startTime,
      endTime,
      notification,
      notificationTime,
      alarmTime,
      userId,
    } = req.body;

    const todo = await Todo.create({
      title: title,
      description: description,
      startTime: startTime,
      endTime: endTime,
      notification: notification,
      notificationTime: notificationTime,
      alarmTime: alarmTime,
      createdBy: userId,
    });

    const user = await User.updateOne(
      { _id: userId },
      { $addToSet: { todos: todo.id } }
    );

    res.status(200).json(todo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error!" });
  }
});

router.put("/update", async (req, res) => {
  try {
    console.log(req.body);

    const todo = await Todo.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
    });

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "internal server error!" });
  }
});

router.put("/delete", async (req, res) => {
  try {
    const taskId = req.body.taskId;
    const todo = await Todo.findById(taskId);
    const userId = todo.createdBy;

    await Todo.findByIdAndDelete(taskId);

    const user = await User.updateOne(
      { _id: userId },
      { $pull: { todos: taskId } }
    );

    res
      .status(204)
      .json({ message: `todo ${taskId} is deleted successfully!` });
  } catch (error) {
    res.status(500).json({ message: "internal server error!" });
  }
});

module.exports = router;
