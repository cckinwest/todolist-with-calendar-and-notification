const mongoose = require("mongoose");
const dayjs = require("dayjs");

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
    type: String,
  },
  endTime: {
    type: String,
  },
  startDate: {
    type: String,
    default: () => {
      return this.startTime.split("T")[0];
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

patternSchema.virtual("dates").get(function () {
  const dates = [];
  var date = this.startDate;

  if (this.frequency === "daily") {
    while (new Date(date).getTime() <= new Date(this.endDate).getTime()) {
      if (!this.except.includes(date)) {
        dates.push(date);
      }

      date = dayjs(date).add(1, "day").format("YYYY-MM-DD");
    }
  }

  if (this.frequency === "weekly") {
    while (new Date(date).getTime() <= new Date(this.endDate).getTime()) {
      if (!this.except.includes(date)) {
        dates.push(date);
      }

      date = dayjs(date).add(7, "day").format("YYYY-MM-DD");
    }
  }

  return dates;
});

patternSchema.pre("save", function (next) {
  next();
});

patternSchema.set("toJSON", { virtuals: true });
patternSchema.set("toObject", { virtuals: true });

const Pattern = mongoose.model("Pattern", patternSchema);

module.exports = Pattern;
