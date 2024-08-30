const express = require("express");
const router = express.Router();

const Todo = require("../models/Todo");
const User = require("../models/User");
const Pattern = require("../models/Pattern");

router.get("/", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.query.username }).populate({
      path: "patterns",
      select: "-__v",
    });

    res.status(200).json(user.patterns);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.post("/create", async (req, res) => {
  try {
    const {
      title,
      description,
      startTime,
      endTime,
      startDate,
      endDate,
      frequency,
      userId,
    } = req.body;

    const pattern = await Pattern.create({
      title: title,
      description: description,
      startTime: startTime,
      endTime: endTime,
      startDate: startDate,
      endDate: endDate,
      frequency: frequency,
      createdBy: userId,
    });

    const user = await User.updateOne(
      { _id: userId },
      { $addToSet: { patterns: pattern._id } }
    );

    res.status(200).json(pattern);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.put("/update", async (req, res) => {
  try {
    const pattern = await Pattern.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
    });

    res.status(200).json(pattern);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.put("/changeAnIndividual", async (req, res) => {
  try {
    const pattern = await Pattern.updateOne(
      { _id: req.body.patternId },
      {
        $addToSet: {
          except: req.body.date,
        },
      }
    );

    const { title, description, startTime, endTime, createdBy } = req.body;

    const todo = await Todo.create({
      title: title,
      description: description,
      startTime: startTime,
      endTime: endTime,
      createdBy: createdBy,
    });

    const user = await User.updateOne(
      { _id: createdBy },
      {
        $addToSet: {
          todos: todo._id,
        },
      }
    );

    res.status(200).json({ pattern: pattern, todo: todo, user: user });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.put("/deleteAnIndividual", async (req, res) => {
  try {
    console.log(req.body);

    await Pattern.updateOne(
      { _id: req.body.patternId },
      {
        $addToSet: {
          except: req.body.date,
        },
      }
    );

    res.status(204).json({
      message: `the task on ${req.body.date} of the pattern is deleted successfully!`,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.put("/delete", async (req, res) => {
  try {
    const patternId = req.body.patternkId;
    const pattern = await Pattern.findById(patternId);
    const userId = pattern.createdBy;

    await Pattern.findByIdAndDelete(patternId);

    const user = await User.updateOne(
      { _id: userId },
      { $pull: { patterns: patternId } }
    );

    res
      .status(204)
      .json({ message: `pattern ${patternId} is deleted successfully!` });
  } catch (error) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
