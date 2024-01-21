const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      reqiured: true,
    },
    author: {
      type: String,
      reqiured: true,
    },
    postId: {
      type: String,
      reqiured: true,
    },
    userId: {
      type: String,
      reqiured: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
