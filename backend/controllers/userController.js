const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

function generateToken(user) {
  const options = {
    expiresIn: "1h",
  };
  const payload = { name: user.username };
  secret = process.env.APP_SECRET;
  if (typeof secret !== "string") {
    secret = process.env.secret;
  }
  return jwt.sign(payload, secret, options);
}
const bcryptRounds = 10;

const register = (request, response) => {
    const { name, username, password, email } = request.body;
    if(!username || !email || !password) {
      response.status(400).json({errorMessage: "Please provide a username, email, and password!"});
    }
    User.findOne(username)
    .then(user => {
      if(user) {
        response.status(401).json({ errorMessage: "This username already exists"})
      }
      else { 
    const encryptedPassword = bcrypt.hashSync(password, bcryptRounds);
    const token = generateToken({ username });
    const user = new User({ name, username, password: encryptedPassword, token, email });
    user
      .save()
      .then(savedUser => {
        response.status(200).send(savedUser);
      })
      .catch(err => {
        response.status(500).send({
          errorMessage: "Error occurred while saving: " + err,
        });
      });
      }
    })
    .catch(err => {
      response.status(500).send({
        errorMessage: "Error occurred while saving: " + err,
      });
    });
  };

  const login = (request, response) => {
    const { username, password } = request.body;
    User.findOne({ username: username })
      .then(userFound => {
        if (!userFound) {
          response.status(500).send({
            errorMessage: "Login Failed.",
          });
        } else {
          if (bcrypt.compareSync(password, userFound.password)) {
            const token = generateToken({ userFound });
            response.status(200).send({ ...userFound, token });
          } else {
            response.status(500).send({
              errorMessage: "Login Failed.",
            });
          }
        }
      })
      .catch(err => {
        response.status(500).send({
          errorMessage: "Failed to Login: " + err,
        });
      });
  };

  const getUserById = (request, response) => {
    User.findById({ _id: request.params.id })
      .then(function(user) {
        response.status(200).json(user);
      })
      .catch(function(error) {
        response.status(500).json({
          error: "The user could not be retrieved.",
        });
      });
  };

  const deleteUserById = (request, response) => {
    const { _id } = request.body;
    User.findByIdAndRemove({ _id: request.params._id })
      .then(function(user) {
        response.status(200).json(user);
      })
      .catch(function(error) {
        response.status(500).json({
          error: "The user could not be removed.",
        });
      });
  };

  const updateUser = (request, response) => {
    const { _id, username, email } = request.body;
    User.findById({ _id: request.params.id })
      .then(function(user) {
        if (user) {
          (user.username = username), (user.email = email);
          User.findByIdAndUpdate({ _id: request.params.id }, user)
            .then(user => {
              response.status(200).json(user);
            })
            .catch(err => {
              response.status(500).json(`message: Error username or email: ${err}`);
            });
        }
      })
      .catch(function(error) {
        response.status(500).json(`message: Error username or email: ${error}`);
      });
  };
  module.exports = {
    register,
    login,
    getUserById,
    deleteUserById,  
    updateUser, 
  };