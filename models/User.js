const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    unique: true,
    required: true,
  },
});

userSchema.virtual("todos", {
  ref: "Todo",
  localField: "_id",
  foreignField: "createdBy",
});

const User = mongoose.model("User", userSchema);

module.exports = User;
