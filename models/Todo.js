const mongoose = require("mongoose");

//import the Schema function from mongoose
const { Schema } = mongoose;
const dayjs = require("dayjs");

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
    type: String
  },
  endTime: {
    type: String
  },
  notification: {
    type: Boolean,
    default: () => {
      return true;
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

todoSchema.virtual("dates").get(function () {
  const dates = [];
  dates.push(dayjs(this.startTime).format("YYYY-MM-DD"));
  return dates;
});

todoSchema.set("toJSON", { virtuals: true });
todoSchema.set("toObject", { virtuals: true });

//name the model defined as Todo
const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
