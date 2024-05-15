import { useRevalidator } from "react-router-dom";
import { v4 as uuid } from "uuid";

const groups = [
  "Artic",
  "New",
  "Islands",
  "Containers",
  "Earth homes",
  "Amazing views",
  "Minsus",
  "Countryside",
  "Campers",
  "National parks",
  "OMG!",
  "Beach",
  "Amazing pools",
  "Design",
  "Trding",
  "Surfing",
  "Cabins",
  "Caves",
  "Camping",
  "Tiny homes",
  "Tropical",
  "Lakefront",
  "Top cities",
  "A-frames",
  "Houseboats",
];
const API_URL =
  "https://pdlbsd6n42.execute-api.us-west-2.amazonaws.com/dev/room";

const getData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  console.log("data", data);
  return data;
};

const getRoom = async (roomId) => {
  let url = `${API_URL}/${roomId}`;
  const roomData = await getData(url);
  return roomData;
};

const searchRooms = async (
  pageCount = 5,
  location = "",
  checkIn = "",
  checkOut = "",
  adults = "",
  children = "",
  infants = "",
  pets = ""
) => {
  let url = `${API_URL}?pageCount=${pageCount}`;
  let searchedBnbs = await getData(url);
  console.log("searchedBnbs", searchedBnbs.rooms);
  return searchedBnbs.rooms;
};

export { groups, searchRooms, getRoom };
