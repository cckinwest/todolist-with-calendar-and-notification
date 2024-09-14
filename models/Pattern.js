const mongoose = require("mongoose");

const { Schema } = mongoose;

const patternSchema = new Schema({
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
  startDate: {
    type: String,
    default: () => {
      return this.startTime.toJSON().split("T")[0];
    },
  },
  endDate: {
    type: String,
    default: () => {
      return this.startDate;
    },
  },
  frequency: {
    type: String,
    enum: ["daily", "weekly", "monthly", "annually"],
  },
  notification: {
    type: Boolean,
    default: () => {
      return true;
    },
  },
  except: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Pattern = mongoose.model("Pattern", patternSchema);

module.exports = Pattern;
