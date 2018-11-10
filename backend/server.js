require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyparser = require("body-parser");

//Instantiate Server
const server = express();

//Bringin Mongoose Database
const mongoose = require("mongoose");

//Connect Database
mongoose
  .connect(db)
  .then(() => console.log("\n=== connected to mongo ===\n"))
  .catch(err => console.log("database is not connected"));

//Security
server.use(helmet());

//Permissions
server.use(cors());

//Enable to parse Json object
server.use(express.json());
server.use(bodyparser.json()); //express.jason

server.use(express.json());

server.use(require("body-parser").text());

//Status server
const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
