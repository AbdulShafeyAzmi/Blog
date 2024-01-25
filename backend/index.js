const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth");
const userRoute = require("./routes/users");
const postRouter = require("./routes/posts");
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
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", userRoute);
app.use("/api/posts", postRouter);
app.listen(process.env.PORT, () => {
  connectToDb();
  console.log("server is running on " + process.env.PORT);
});
