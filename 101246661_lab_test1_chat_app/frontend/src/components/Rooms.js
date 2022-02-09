import React from "react";
import { Link } from "react-router-dom";

export default function Rooms() {
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <div>
      <h1>Choose a Room to Join</h1>
      <Link to="/chat/1">
        <h2>Room 1</h2>
      </Link>
      <Link to="/chat/2">
        <h2>Room 2</h2>
      </Link>
      <Link to="/chat/3">
        <h2>Room 3</h2>
      </Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
