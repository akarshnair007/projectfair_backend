// only file that runs in the backend.
//1) dot env

require("dotenv").config(); //environment variable(.env file) will be added to process.env file

//2) import express
const express = require("express");

//3) import cors
const cors = require("cors");

//import router
const router = require("./router");
// const appMiddleware = require("./middleware/appMiddleware");

//import mongoDB
require("./db/connection");

// create server
const projectFairServer = express();

//use cors to connect with frontend
projectFairServer.use(cors());

//json() - middleware - to convert json format
projectFairServer.use(express.json());

//use middleware
// projectFairServer.use(appMiddleware);

//server use router
projectFairServer.use(router);

//first - by which name of the folder have to be called
//second - export this folder
projectFairServer.use("/uploads", express.static("./uploads"));

projectFairServer.get("/", (req, res) => {
  res.send("GET request received");
});

//port
const PORT = 3000 || process.env.PORT;

//run the server
projectFairServer.listen(PORT, () => {
  console.log(
    `project fair server running successfully at port number : ${PORT}`
  );
});
