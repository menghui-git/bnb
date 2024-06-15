const categories = [
  'Artic',
  'New',
  'Islands',
  'Containers',
  'Earth homes',
  'Amazing views',
  'Minsus',
  'Countryside',
  'Campers',
  'National parks',
  'OMG!',
  'Beach',
  'Amazing pools',
  'Design',
  'Trding',
  'Surfing',
  'Cabins',
  'Caves',
  'Camping',
  'Tiny homes',
  'Tropical',
  'Lakefront',
  'Top cities',
  'A-frames',
  'Houseboats',
];
const API_URL =
  'https://pdlbsd6n42.execute-api.us-west-2.amazonaws.com/dev/room';

const getData = async <TData>(url: string) => {
  const response = await fetch(url);
  const data = await response.json();

  return data as TData;
};

const getRoom = async (roomId: string) => {
  const url = `${API_URL}/${roomId}`;
  const roomData = await getData<API.RoomDetail>(url);

  return roomData;
};

const searchRooms = async (
  pageCount = 5,
  location = '',
  checkIn = '',
  checkOut = '',
  adults = '',
  children = '',
  infants = '',
  pets = '',
) => {
  const url = `${API_URL}?pageCount=${pageCount}`;
  const searchedBnbs = await getData<{
    rooms: API.Room[];
  }>(url);

  return searchedBnbs.rooms;
};

export { categories, searchRooms, getRoom };
