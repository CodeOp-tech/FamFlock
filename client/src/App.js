import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";

import NavBar from "./components/NavBar";
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import TripsView from "./views/TripsView";
import RegisterView from "./views/RegisterView";
import MyProfileView from "./views/MyProfileView";
import Local from "./helpers/Local";
import Api from "./helpers/Api";

function App() {
  const [user, setUser] = useState(0); // useState 1: sets logged in user

  // const [user, setUser] = useState(Local.getUser()); // useState 1: sets logged in user
  const [loginErrorMessage, setLoginErrorMessage] = useState(""); // useState 2
  const navigate = useNavigate();

  // log in
  async function doLogin(username, password) {
    let myresponse = await Api.loginUser(username, password);
    if (myresponse.ok) {
      Local.saveUserInfo(myresponse.data.token, myresponse.data.user);
      setUser(myresponse.data.user);
      setLoginErrorMessage("");
      navigate("/my-trips");
    } else {
      setLoginErrorMessage("Login failed");
    }
  }

  // log out
  function doLogout() {
    Local.removeUserInfo();
    setUser(null);
  }

  // register a new user
  async function register(email, username, password, fullname, picture) {
    let myresponse = await Api.newUser(
      email,
      username,
      password,
      fullname,
      picture
    );
    if (myresponse.ok) {
      // browser popup saying you've been registered
      alert("You have been registered!");
      // // save the token, aka log them in
      // Local.saveUserInfo(myresponse.data.token, myresponse.data.user);
      // setUser(myresponse.data.user);
      // setLoginErrorMessage("");
      // navigate("/my-trips");
    } else {
      setLoginErrorMessage("Registration failed");
    }
    doLogin(username, password);
  }

  return (
    <div className="App">
      <NavBar logoutCb={doLogout} user={user} />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/my-trips" element={<TripsView />} />
        <Route
          path="/login"
          element={
            <LoginView
              loginCb={(username, password) => doLogin(username, password)}
            />
          }
        />
        <Route
          path="/register"
          element={<RegisterView registerCb={register} />}
        />
        <Route path="/profile/:id" element={<MyProfileView user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
