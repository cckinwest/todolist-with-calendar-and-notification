const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const User = require("../models/User");
const verifyJWT = require("../middleware/middleware");

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
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

router.post("/create", verifyJWT, async (req, res) => {
  try {
    const { title, description } = req.body;
    const { id } = req.user;
    const todo = await Todo.create({
      title: title,
      description: description,
      createdBy: id,
    });
    const user = await User.findById(id);
    await user.populate("todos");
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

router.delete("/delete/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res
      .status(204)
      .json({ message: `todo ${req.params.id} is deleted successfully!` });
  } catch (error) {
    res.status(500).json({ message: "internal server error!" });
  }
});

module.exports = router;
