import "./App.css";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Rooms from "./components/Rooms";
import React from "react";
import Signup from "./components/Signup";
import Room from "./components/Room";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              !localStorage.getItem("user") ? (
                <Login />
              ) : (
                <Navigate to="/chat" />
              )
            }
          />
          <Route
            path="/login"
            element={
              !localStorage.getItem("user") ? (
                <Login />
              ) : (
                <Navigate to="/chat" />
              )
            }
          />
          <Route
            path="/signup"
            element={
              !localStorage.getItem("user") ? (
                <Signup />
              ) : (
                <Navigate to="/chat" />
              )
            }
          />
          <Route
            path="/chat"
            element={
              localStorage.getItem("user") ? (
                <Rooms />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/chat/:id"
            element={
              localStorage.getItem("user") ? <Room /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
