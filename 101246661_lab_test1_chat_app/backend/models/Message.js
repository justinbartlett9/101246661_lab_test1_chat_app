const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  from_user: {
    type: String,
    required: true,
    trim: true,
  },
  room: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  date_sent: {
    type: Date,
    default: Date.now(),
    required: true,
    trim: true,
  },
});

MessageSchema.query.byRoom = function (value) {
  return this.where({ room: value });
};

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
