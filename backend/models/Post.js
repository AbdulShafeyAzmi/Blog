const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      reqiured: true,
      unique: true,
    },
    desc: {
      type: String,
      reqiured: true,
      unique: true,
    },
    photo: {
      type: String,
      reqiured: false,
    },
    username: {
      type: String,
      reqiured: false,
    },
    userId: {
      type: String,
      reqiured: false,
    },
    categories: {
      type: Array,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Post", PostSchema);
