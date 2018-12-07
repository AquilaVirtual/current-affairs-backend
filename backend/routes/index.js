const express = require("express");
const mongoose = require("mongoose");
const UserController = require("../controllers/userController");
const router = express.Router();

mongoose.connect(
    "mongodb://aquila:currentnews123@ds048878.mlab.com:48878/current-affairs",
  {},
  function(err) {
    if (err) console.log(err);
  },
);

router.post("/api/user/register", (request, response) => {
    UserController.register(request, response);
  });  
  router.post("/api/user/login", (request, response) => {
    UserController.login(request, response);
  });
  router.put("/api/user/update/:id", function(request, response) {
    UserController.updateUser(request, response);
  });  
  router.get("/api/user/:id", function(req, res) {
    UserController.getUserById(req, res);
  });
  router.delete("/api/user/:id", function(req, res) {
    UserController.deleteUserById(req, res);
  });
  router.get("/api/user/", function(req, res) {
  UserController.getAllUsers(req, res);
});

  module.exports = router;