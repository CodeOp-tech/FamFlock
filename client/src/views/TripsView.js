import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddTripPopUp from "../components/AddTripPopUp.js";

function TripsView(props) {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [trips, setTrips] = useState([]);
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    getTrips();
  }, []);

  const getTrips = () => {
    fetch("/trips")
      .then((response) => response.json())
      .then((trips) => {
        setTrips(trips);
        console.log("Í am", trips);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addTrip = async (formData) => {
    console.log("Í am post", formData);
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    try {
      let response = await fetch("/trips", options);
      if (response.ok) {
        let data = await response.json();
        setTrips(data);
        console.log(data);
      } else {
        console.log(`server error: ${response.statud} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`network error: ${err.message}`);
    }
  };

  //   const handleSaveTrip = (e) => {
  //     e.preventDefault();
  //     addTrip(trip);
  //     console.log(trip);
  //   };

  return (
    <div>
      {/* button to add a new trip OPENS POP UP COMPONENT*/}
      <div>
        <button className="modalBtn" onClick={() => setOpenPopUp(true)}>
          Add New Trip
        </button>
      </div>
      {/* used pop up component */}
      <AddTripPopUp
        open={openPopUp}
        onClose={() => setOpenPopUp(false)}
        addTrip={(formData) => addTrip(formData)}
      />
      <div className="container">
        {/* map through trip cards */}
        {props.trips.map((trip) => (
          <div className="row" key={trip.id} style={{ width: "25rem" }}>
            <div className="card-body">
              <h4 className="card-title">{trip.destination}</h4>
              <h6 className="card-text">
                {trip.startDate} - {trip.endDate}
              </h6>
            </div>
            {/* button for editing trip info ///// !!NOT FUNCTION YET!! ///// */}
            <div className="card-footer">
              <Link to={"/trips/" + trip.id}>
                <button className="btn btn-outline-primary">Edit</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TripsView;
