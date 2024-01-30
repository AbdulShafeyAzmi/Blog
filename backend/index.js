const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const path = require("path");
const authRouter = require("./routes/auth");
const userRoute = require("./routes/users");
const postRouter = require("./routes/posts");
const commentRouter = require("./routes/comments");

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

//middlewares
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/api/auth", authRouter);
app.use("/api/users", userRoute);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

//image upload
const storage = multer.diskStorage({
  destination: (req, res, fn) => {
    fn(null, "images");
  },
  filename: (req, file, fn) => {
    fn(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("Image has been uploaded successfully");
});

app.listen(process.env.PORT, () => {
  connectToDb();
  console.log("server is running on " + process.env.PORT);
});
