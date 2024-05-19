import React, { useState, useEffect } from "react";

import { searchRooms } from "../../data";
import { Card } from "./components/Card";
import "./index.css";

export const HomePage = () => {
  let pageCount = 5;
  const [rooms, setBnbs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadNum, setLoadNum] = useState(0);
  const [conditions, setConditions] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
  });
  const [currency, setCurrency] = useState("TWD");

  useEffect(() => {
    const getRooms = async () => {
      let rooms = await searchRooms((pageCount = pageCount));
      setBnbs(rooms);
    };
    getRooms();
  }, []);

  const onPictureLoad = () => {
    const newLoadNumber = loadNum + 1;
    setLoadNum(newLoadNumber);
    if (newLoadNumber === pageCount) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="grid-container result">
        {rooms.map((room) => (
          <Card
            key={room.id}
            room={room}
            currency={currency}
            onPictureLoad={onPictureLoad}
            isLoading={isLoading}
          />
        ))}
      </div>
      <div>
        <div>Continue exploring</div>
        <button>Show more</button>
      </div>
    </>
  );
};
