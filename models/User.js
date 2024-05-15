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

  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
