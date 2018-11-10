const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({ 

  // Display name
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  // login name
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    unique: true,
  },

});

let userModel = mongoose.model("User", userSchema);

module.exports = userModel;
