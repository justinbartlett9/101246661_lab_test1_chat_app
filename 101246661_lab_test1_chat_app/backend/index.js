const express = require("express");
const app = express();
const http = require("http").createServer(app);
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
//Initialize new socket.io instance and pass the http server to it
const io = require("socket.io")(http, {
  cors: {
    origins: ["http://localhost:3000"],
  },
});
app.use(cors());
app.use(express.json());
app.use(require("./routes/UserRoutes"));
app.use(require("./routes/MessageRoutes"));

mongoose
  .connect(
    "mongodb+srv://justin:comp3123@comp3123.iohhl.mongodb.net/comp3133_labtest1?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((success) => {
    console.log("Success Mongodb connection");
  })
  .catch((err) => {
    console.log("Error Mongodb connection");
  });

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("join", (roomName) => {
    console.log("joining " + roomName);
    socket.join(roomName);
  });

  socket.on("message", ({ from_user, room, message, date_sent }) => {
    io.to(room).emit("message", { from_user, room, message, date_sent });
  });

  socket.on("typing", ({ user, room }) => {
    socket.to(room).emit("typing", { user, room });
  });
});

app.get("/", (req, res) => {
  req.send("Server is up and running");
});

http.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
