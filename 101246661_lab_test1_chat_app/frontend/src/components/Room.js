import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, Navigate } from "react-router-dom";
import {
  connectToSocket,
  subscribeToChat,
  sendMessage,
  joinRoom,
  setTyping,
  subscribeToTyping,
} from "../socketService";

export default function Room() {
  const params = useParams();
  const roomName = params.id;
  const user = localStorage.getItem("user");
  const [messages, setMessages] = useState([]);
  const [typingMessage, setTypingMessage] = useState("");

  useEffect(() => {
    async function fetchMessages() {
      try {
        // fetch messages for the current room
        let messages = await axios
          .get(`http://localhost:5000/messages/${roomName}`)
          .then((response) => {
            return response.data;
          });
        setMessages(messages);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMessages();
    connectToSocket();
    joinRoom(roomName);
    subscribeToChat((err, data) => {
      fetchMessages();
    });
    subscribeToTyping((err, data) => {
      if (data.user) {
        setTypingMessage(`${data.user} is typing...`);
      } else {
        setTypingMessage("");
      }
    });
  }, [roomName]);

  const handleTyping = (event) => {
    if (event.target.value) {
      setTyping({ user, room: roomName }, () => {});
    } else {
      setTyping({ user: "", room: roomName }, () => {});
    }
  };

  const handleMessageSend = async (event) => {
    event.preventDefault();
    let message = event.currentTarget.message.value;
    event.currentTarget.message.value = "";
    let message_object = {
      from_user: user,
      room: roomName,
      message: message,
      date_sent: Date.now(),
    };

    // send message to the current room
    try {
      await axios.post("http://localhost:5000/message", message_object);
      sendMessage(message_object, () => {
        setMessages([...messages, message_object]);
      });
      setTyping({ user: "", room: roomName }, () => {});
    } catch (error) {
      console.log(error);
    }
  };

  const renderMessage = (m) => {
    return m.from_user == user ? (
      <div key={m._id}>
        <div
          style={{
            background: "blue",
            color: "white",
            width: "30%",
            marginTop: "20px",
            marginLeft: "auto",
            marginRight: "15px",
            minHeight: "50px",
            borderRadius: "20px",
            wordWrap: "break-word",
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingTop: "auto",
            paddingBottom: "auto",
          }}
        >
          {m.message}
        </div>
        <div style={{ maxWidth: "10%", marginLeft: "auto" }}>
          sent by {m.from_user} at {m.date_sent}
        </div>
      </div>
    ) : (
      <div key={m._id}>
        <div
          style={{
            background: "silver",
            width: "30%",
            marginTop: "20px",
            marginRight: "auto",
            marginLeft: "15px",
            minHeight: "50px",
            borderRadius: "20px",
            wordWrap: "break-word",
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingTop: "auto",
            paddingBottom: "auto",
          }}
        >
          {m.message}
        </div>
        <div style={{ maxWidth: "10%", marginRight: "auto" }}>
          sent by {m.from_user} at {m.date_sent}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div
        style={{
          background: "grey",
          color: "white",
          minHeight: "40px",
          position: "relative",
          top: -20,
          width: "100%",
        }}
      >
        <h2>Chat Room {roomName}</h2>
        <Link to="/chat">Leave Room</Link>
      </div>
      <div style={{ overflowY: "scroll", height: "83vh" }}>
        {messages.map((m) => {
          return renderMessage(m);
        })}
      </div>
      <div
        style={{
          position: "fixed",
          left: 15,
          bottom: 90,
          fontWeight: "bold",
          fontStyle: "oblique",
        }}
      >
        {typingMessage}
      </div>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          background: "grey",
          minHeight: "70px",
        }}
      >
        <form onSubmit={handleMessageSend}>
          <input
            type="text"
            id="message"
            placeholder="Type your message here"
            onChange={handleTyping}
            style={{
              width: "90%",
              minHeight: "30px",
              position: "relative",
              bottom: -15,
            }}
          />
          <button
            style={{
              minHeight: "36px",
              position: "relative",
              bottom: -15,
            }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
