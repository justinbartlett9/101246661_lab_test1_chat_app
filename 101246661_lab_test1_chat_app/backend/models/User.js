const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

UserSchema.query.byUsername = function (value) {
  return this.where({ username: value });
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
