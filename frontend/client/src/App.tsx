import React from "react";

import "./App.css";
import SignUp from "./components/SignUp/SignUp";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Post from "./components/Post/Post";
import Home from "./components/Home/Home";

import { useSelector } from "react-redux";

import state from "./state/state";
import Profile from "./components/Profile/Profile";
function App() {
  const isAuth = Boolean(useSelector((state: any) => state.token));
  return (
    <div className="h-full box-border">
      <BrowserRouter>
        <Routes>
        <Route
            path="/profile"
            element={isAuth ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={isAuth ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/posts"
            element={isAuth ? <Post /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
