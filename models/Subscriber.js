const mongoose = require("mongoose");
const { Schema } = mongoose;
const subscriptionSchema = require("./Subscription");

const subscriberSchema = new Schema({
  subscription: {
    type: subscriptionSchema,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Subscriber = mongoose.model("Subscriber", subscriberSchema);

module.exports = Subscriber;
