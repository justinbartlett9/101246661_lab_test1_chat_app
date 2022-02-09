import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [error, setError] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError();
    let username = event.currentTarget.username.value;
    let password = event.currentTarget.password.value;

    try {
      // try to fetch user by inputted username
      let fetch_user = await axios
        .get(`http://localhost:5000/user/${username}`)
        .then((response) => {
          return response.data;
        });

      // if password is correct, set local storage and redirect
      if (password === fetch_user.password) {
        localStorage.setItem("user", username);
        window.location.reload();
      }
      // if password is incorrect, set error message
      else {
        setError("Password is incorrect.");
      }
    } catch (error) {
      console.log(error);
      // if username is not found in database, show error message
      if (error.message.includes("404")) {
        setError("User not found.");
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
        <button type="submit">Login</button>
      </form>
      <h5 style={{ color: "red" }}>{error}</h5>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}
