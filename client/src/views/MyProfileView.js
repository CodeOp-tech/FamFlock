import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import MyProfileCss from "./MyProfileView.css";

function MyProfileView() {
  const [buttonClick, setButtonClick] = useState(false); // useState 1
  const { user, editUser } = useContext(UserContext);

  let { id } = useParams();

  const form = {
    picture: "",
    fullname: user.fullname,
    email: user.email,
    username: user.username,
    currentPassword: "",
    newPassword: "",
  };

  const [formData, setFormData] = useState(form); // useState 2

  function handleClick(event) {
    event.preventDefault();
    setButtonClick(!buttonClick);
  }

  function handleSubmit(event) {
    event.preventDefault();
    editUser(
      formData.picture,
      formData.fullname,
      formData.email,
      formData.username,
      formData.currentPassword,
      formData.newPassword,
      id
    );
    setButtonClick(!buttonClick);
  }

  function handleChange(event) {
    let { name, value } = event.target;

    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  return (
    <div className="container">
      {buttonClick ? (
        <div className="profileContainer">
          <div>
            <img
              className="propfilePic"
              src={user.picture}
              alt="Profile Picutre"
            />
          </div>
          <form onSubmit={handleSubmit} className="form">
            <div className="row">
              <h2 className="heading myprofile">My Profile</h2>
              <div className="col">
                <label for="pic">Change Profile Picture</label>
                <input
                  accept="image/*"
                  value={formData.picture}
                  name="picture"
                  onChange={handleChange}
                  className="form-control col"
                  id="pic"
                  type="text"
                />
              </div>
              <div className="col">
                <label for="fullname">Edit name</label>
                <input
                  value={formData.fullname}
                  name="fullname"
                  onChange={handleChange}
                  className="form-control col"
                  id="fullname"
                  type="text"
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label for="email">Edit email</label>
                <input
                  value={formData.email}
                  name="email"
                  onChange={handleChange}
                  className="form-control"
                  id="email"
                  type="text"
                />
              </div>
              <div className="col">
                <label for="username">Edit username</label>
                <input
                  value={formData.username}
                  name="username"
                  onChange={handleChange}
                  className="form-control"
                  id="username"
                  type="text"
                />
              </div>
            </div>
            <br />
            <div className="row">
              <h5 className="heading">Change Password</h5>
              <div className="col">
                <label for="curpass">Current password</label>
                <input
                  value={formData.currentPassword}
                  name="currentPassword"
                  onChange={handleChange}
                  className="form-control"
                  id="curpass"
                  type="text"
                />
              </div>
              <div className="col">
                <label for="newpass">New password</label>
                <input
                  id="newpass"
                  type="text"
                  value={formData.newPassword}
                  name="newPassword"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>
            <button className="btn btn-primary col col-1" type="submit">
              Save
            </button>
          </form>
        </div>
      ) : (
        <div className="profileContainer">
          <div>
            <h2 className="heading">My Profile</h2>
            <img
              className="propfilePic"
              src={user.picture}
              alt="Profile Picture"
            />
            <br />
            {user.fullname}
            <br />
            {user.email}
            <br />
            {user.username}
            <br />
            <button className="btn btn-primary shadow" onClick={handleClick}>
              Edit
            </button>
          </div>
          <div></div>
        </div>
      )}
    </div>
  );
}

export default MyProfileView;
