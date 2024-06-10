const mongoose = require("mongoose");

const connectString = process.env.DATABASE;

mongoose
  .connect(connectString)
  .then(() => {
    console.log("mongodb connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });
