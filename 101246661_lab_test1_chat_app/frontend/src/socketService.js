import { io } from "socket.io-client";

let socket;

export const connectToSocket = () => {
  socket = io("http://localhost:5000");
};

export const joinRoom = (roomName) => {
  if (socket) socket.emit("join", roomName);
};

export const subscribeToChat = (cb) => {
  if (!socket) return true;
  socket.on("message", (message) => {
    return cb(null, message);
  });
};

export const sendMessage = ({ from_user, room, message, date_sent }, cb) => {
  if (socket) {
    socket.emit("message", { from_user, room, message, date_sent }, cb);
  }
};

export const setTyping = ({ user, room }, cb) => {
  if (socket) {
    socket.emit("typing", { user, room }, cb);
  }
};

export const subscribeToTyping = (cb) => {
  if (!socket) return true;
  socket.on("typing", ({ user, room }) => {
    return cb(null, { user, room });
  });
};
