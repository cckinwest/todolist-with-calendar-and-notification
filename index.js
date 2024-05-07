const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");
const Todos = require("./model/todo.js");

require("dotenv").config(); //for using the variable in .env

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("MongoDB is connected!");
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todos.find(); //the find function to get all the todo in the model
    res.status(200).json(todos); //set the htmlCode to be 200 and send the json
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const todo = await Todos.findById(req.params.id); //get the id params from the address
    console.log(`The todo ${req.params.id} is got.`);
    res.status(200).json(todo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

app.post("/todos/create", async (req, res) => {
  try {
    const newTodo = await Todos.create(req.body); //req.body contains all the params created
    console.log(`The todo is created.`);
    res.status(201).json(newTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

app.put("/todos/update/:id", async (req, res) => {
  try {
    const updatedTodo = await Todos.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(`The todo ${req.params.id} is updated.`);
    res.status(200).json(updatedTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

app.delete("/todos/delete/:id", async (req, res) => {
  try {
    const deletedTodo = await Todos.findByIdAndDelete(req.params.id);
    console.log(`The todo ${req.params.id} is deleted.`);
    res.status(204).json(deletedTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
