const mongoose = require("mongoose");
const { Schema } = mongoose;

const subscriptionSchema = new Schema({
  endpoint: {
    type: String,
    required: true,
  },
  expirationTime: {
    type: Date,
    default: () => {
      return null;
    },
  },
  keys: {
    p256dh: {
      type: String,
      required: true,
    },
    auth: {
      type: String,
      required: true,
    },
  },
});

module.exports = subscriptionSchema;
