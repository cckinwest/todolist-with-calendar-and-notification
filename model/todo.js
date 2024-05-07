const mongoose = require("mongoose");

//import the Schema function from mongoose
const { Schema } = mongoose;

//first define the Schema
const todoSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});

//name the model defined as Todo
const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
