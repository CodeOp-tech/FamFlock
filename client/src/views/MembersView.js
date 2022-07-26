import React, { useState, useContext } from "react";
import { useEffect } from "react";
import TripByIdNav from "../components/TripByIdNav";
import TripByIdNavCss from "../components/TripByIdNav.css";
import TripsContext from "../context/TripsContext";
import BudgetForm from "../components/BudgetForm";
import BudgetTable from "../components/BudgetTable";
import BasicInfo from "../components/BasicInfo";
import MembersCss from "./MembersView.css";

function MembersView(props) {
  const { trip, budget } = useContext(TripsContext);
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    props.addMemberCb(email, trip.id);
  }

  function handleChange(event) {
    let { name, value } = event.target;
    setEmail(value);
  }

  function handleClick(userId) {
    props.removeMemberCb(userId, trip.id);
  }

  return (
    <div>
      <TripByIdNav />
      <div className="tripById">
        <BasicInfo />

        <div className="container">
          <h2 className="heading">Trip Members</h2>
          <br />{" "}
          {props.usersInTrip.map((u) => (
            <div className="members">
              {u.fullname ? (
                <div className="row">
                  <img
                    className="profilepicsmall"
                    src={u.picture}
                    alt="Profile Picutre"
                  />
                  <div className="col"> {u.email}</div>
                  <div className="col"> {u.fullname}</div>
                  <div className="col">{u.username}</div>
                  <button
                    className="col col-md-1 btn btn-primary shadow"
                    onClick={() => handleClick(u.id)}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="row">
                  <div className="col">{u.email}</div>
                  <div className="col"></div>
                  <div className="col"></div>
                  <button
                    className="col col-md-1 btn btn-primary shadow"
                    onClick={() => handleClick(u.id)}
                  >
                    Remove
                  </button>
                </div>
              )}
              <hr />
            </div>
          ))}
        </div>
        <div className="container">
          <form onSubmit={handleSubmit} className="row">
            <h6 className="heading">Add new members</h6>
            <input
              className="form-control col newMembers my-3"
              type="text"
              name="email"
              required
              onChange={handleChange}
              placeholder="example@email.com"
            />
            <button className="btn btn-primary col col-md-1 shadow">Add</button>
          </form>
        </div>
      </div>
      <div>
        <div>
          <BudgetForm />
        </div>
        <div>
          <BudgetTable />
        </div>
      </div>
    </div>
  );
}

export default MembersView;
