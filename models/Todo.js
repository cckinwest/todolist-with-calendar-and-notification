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
    type: String,
  },
  endTime: {
    type: String,
  },
  notification: {
    type: Boolean,
    default: () => {
      return true;
    },
  },
  notificationTime: {
    type: String,
    enum: ["1h", "30min"],
    default: () => {
      return "1h";
    },
  },
  alarmTime: {
    type: String,
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

todoSchema.virtual("notificationStart").get(function () {
  const start = [];

  if (this.notification) {
    if (this.notificationTime === "1h") {
      start.push(
        dayjs(this.startTime).subtract(1, "hour").format("YYYY-MM-DDTHH:mm")
      );
    }

    if (this.notificationTime === "30min") {
      start.push(
        dayjs(this.startTime).subtract(30, "minute").format("YYYY-MM-DDTHH:mm")
      );
    }
  }

  return start;
});

todoSchema.set("toJSON", { virtuals: true });
todoSchema.set("toObject", { virtuals: true });

//name the model defined as Todo
const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
