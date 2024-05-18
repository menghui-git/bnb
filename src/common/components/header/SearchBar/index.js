// @ts-check

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import "./index.css";

export const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numPerson, setNumPerson] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    onSearch(location, checkIn, checkOut, numPerson);
  };

  return (
    <div className="search-bar-outer">
      <form className="search-bar" onSubmit={onSubmit}>
        <div>
          <label>Where</label>
          <input
            type="text"
            placeholder="Search destinations"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label>Check in</label>
          <input
            type="text"
            placeholder="Add dates"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>
        <div>
          <label>Check out</label>
          <input
            type="text"
            placeholder="Add dates"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
        <div className="search">
          <div>
            <label>Who</label>
            <input
              type="text"
              placeholder="Add guests"
              value={numPerson}
              onChange={(e) => setNumPerson(e.target.value)}
            />
          </div>
          <div id="search-icon">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        </div>
      </form>
    </div>
  );
};
