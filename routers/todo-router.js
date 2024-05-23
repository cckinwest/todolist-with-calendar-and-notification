const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const User = require("../models/User");
const verifyJWT = require("../middleware/middleware");

router.get("/", verifyJWT, async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    res.status(200).json(user.todos);
  } catch (error) {
    res.status(500).json({ message: "internal server error!" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "internal server error!" });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { title, description, userId } = req.body;

    const todo = await Todo.create({
      title: title,
      description: description,
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

router.put("/update/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "internal server error!" });
  }
});

router.delete("/delete/:id", verifyJWT, async (req, res) => {
  try {
    const { id } = req.user;

    await Todo.findByIdAndDelete(req.params.id);
    const user = await User.updateOne(
      { _id: id },
      { $pull: { todos: req.params.id } }
    );

    console.log(user.todos);

    res
      .status(204)
      .json({ message: `todo ${req.params.id} is deleted successfully!` });
  } catch (error) {
    res.status(500).json({ message: "internal server error!" });
  }
});

module.exports = router;
