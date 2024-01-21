const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
//database connection
const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connect succesfully");
  } catch (err) {
    console.log(err);
  }
};

dotenv.config();
app.listen(process.env.PORT, () => {
  connectToDb();
  console.log("server is running on " + process.env.PORT);
});
