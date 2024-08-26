const mongoose = require("mongoose");

//import the Schema function from mongoose
const { Schema } = mongoose;

//first define the Schema
const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  startTime: {
    type: Date,
    default: Date.now,
  },
  endTime: {
    type: Date,
    default: () => {
      return this.startTime;
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

//name the model defined as Todo
const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
