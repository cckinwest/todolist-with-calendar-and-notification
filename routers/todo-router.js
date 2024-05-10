const express = require("express");
const router = express.Router();
const Todo = require("../model/Todo");

router.get("/", async (res, req) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "internal server error!" });
  }
});

router.get("/:id", async (res, req) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "internal server error!" });
  }
});

router.post("/create", async (res, req) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "internal server error!" });
  }
});

router.put("/update/:id", async (res, req) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "internal server error!" });
  }
});

router.delete("/delete/:id", async (res, req) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: `todo ${req.params.id} is deleted successfully!`})
  } catch (error) {
    res.status(500).json({ message: "internal server error!" });
  }
});

module.exports = router;
