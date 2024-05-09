const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = Schema({
  username: {
    type: String,
  },

  password: {
    type: String,
  },

  secretKey: {
    type: String,
  },
});

const User = mongoose("User", userSchema);

module.exports = User;
