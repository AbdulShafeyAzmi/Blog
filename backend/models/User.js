const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      reqiured: true,
      unique: true,
    },
    email: {
      type: String,
      reqiured: true,
      unique: true,
    },
    password: {
      type: String,
      reqiured: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("User", UserSchema);
