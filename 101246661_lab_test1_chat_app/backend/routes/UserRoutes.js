const express = require("express");
const userModel = require("../models/User");
const app = express();

app.get("/user/:username", async (req, res) => {
  const username = req.params.username;
  const user = await userModel.findOne().byUsername(username);
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(404).send("User not found");
  }
});

app.post("/user", async (req, res) => {
  const user = new userModel(req.body);

  try {
    if (await userModel.findOne().byUsername(req.body.username)) {
      res.status(400).send("Username already exists");
    } else {
      await user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send(user);
        }
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
