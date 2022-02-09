import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [error, setError] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError();
    let username = event.currentTarget.username.value;
    let password = event.currentTarget.password.value;
    let password2 = event.currentTarget.password2.value;

    // check if password matches confirm password
    if (password !== password2) {
      setError("Passwords do not match.");
    } else {
      try {
        await axios.post("http://localhost:5000/user", { username, password });
        // user is successfully created
        localStorage.setItem("user", username);
        window.location.reload();
      } catch (error) {
        console.log(error);
        // if entered username is already taken, display error
        if (error.message.includes("400")) {
          setError("Username is taken.");
        }
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" id="username" required />
        </label>
        <label>
          Password:
          <input type="password" id="password" required />
        </label>
        <label>
          Confirm Password:
          <input type="password" id="password2" required />
        </label>
        <button type="submit">Sign Up</button>
      </form>
      <h5 style={{ color: "red" }}>{error}</h5>
      <Link to="/login">Back to Login</Link>
    </div>
  );
}
