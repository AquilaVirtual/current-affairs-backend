const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  subscriber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, 
  },
  subscribedOn: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

let subscriptionModel = mongoose.model("Subscription", subscriptionSchema);

module.exports = subscriptionModel;
