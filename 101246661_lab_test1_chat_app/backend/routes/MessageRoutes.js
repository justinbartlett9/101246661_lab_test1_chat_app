const express = require("express");
const messageModel = require("../models/Message");
const app = express();

app.get("/messages/:room", async (req, res) => {
  const room = req.params.room;
  const messages = await messageModel.find().byRoom(room);
  if (messages) {
    res.status(200).send(messages);
  } else {
    res.status(404).send("No messages found");
  }
});

app.post("/message", async (req, res) => {
  const message = new messageModel(req.body);

  try {
    await message.save((err) => {
      if (err) {
        res.send(err);
      } else {
        res.send(message);
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
