import React, { useState } from "react";
import YelpPopUpAddItinerary from "./YelpPopUpAddItinerary";

// define empty form
const EMPTY_FORM = {
  activity: "",
  date: "",
  location: "",
  time: "",
  //   date is column date
};

function YelpSearchResults(props) {
  const [selected, setSelected] = useState({}); // useState 1
  const [formData, setFormData] = useState(EMPTY_FORM); //useState 2
  const [openPopUp, setOpenPopUp] = useState(false);

  function handleClick(id) {
    let selected = null;
    selected = props.searchResults?.filter((e) => e.id === id);
    setSelected(selected[0]);
    setOpenPopUp(true);
  }
  return (
    <div>
      <YelpPopUpAddItinerary
        selected={selected}
        open={openPopUp}
        onClose={() => setOpenPopUp(false)}
      />
      <h3>Search Results</h3>
      <div>
        <table>
          <thead>
            <tr>
              <th>
                <h3>Name</h3>
              </th>
              <th>
                <h3>Image</h3>
              </th>
              <th>
                <h3>Details</h3>
              </th>
              <th>
                <h3>Add to itinerary</h3>
              </th>
            </tr>
          </thead>
          <tbody>
            {props.searchResults &&
              props.searchResults.map((r) => (
                <tr key={r.id}>
                  <td>
                    <h3>{r.name}</h3>
                    <h4>{r.price}</h4>

                    <img
                      src={`/YelpImages/${r.rating}.png`}
                      alt={`rating ${r.rating}`}
                      width="60"
                    />
                    <a href={r.url} target="_blank" rel="noreferrer">
                      <img
                        alt="yelp logo"
                        src="/YelpImages/yelp_logo.png"
                        width="60"
                      ></img>
                    </a>
                    <p>Based on{" " + r.review_count + " "}reviews</p>
                  </td>
                  <td>
                    <img
                      src={r.image_url}
                      width="120"
                      height="120"
                      alt={"image of" + r.name}
                    />
                  </td>
                  <td>
                    <b>Address:</b>
                    {r.location.address1},{r.location.city},
                    {r.location.zip_code}
                    <b>Phone:</b>
                    {r.phone}
                  </td>

                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleClick(r.id)}
                    >
                      Add to itinerary
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default YelpSearchResults;
