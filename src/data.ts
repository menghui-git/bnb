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
const API_URL = 'https://7ixosa7s47.execute-api.us-west-2.amazonaws.com/dev';

const getAsync = async <TData>(url: string) => {
  const response = await fetch(url);
  const data = await response.json();

  return data as TData;
};

const getRoom = async (roomId: string) => {
  const url = `${API_URL}/room/${roomId}`;
  const roomData = await getAsync<API.RoomDetail>(url);

  return roomData;
};

const searchRooms = async (
  pageCount = 5,
  pageIndex = 0,
  location = '',
  checkIn = '',
  checkOut = '',
  adults = '',
  children = '',
  infants = '',
  pets = '',
) => {
  const url = `${API_URL}/rooms?pageIndex=${pageIndex}&pageCount=${pageCount}`;
  const searchedBnbs = await getAsync<API.RoomListResponse>(url);

  return searchedBnbs;
};

const postAsync = async (url: string, payload: any) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();

  return data;
};

const login = async (username: string, password: string) => {
  const url = `${API_URL}/auth/login`;
  const payload = { username, password };
  try {
    return postAsync(url, payload);
  } catch (error) {
    // TODO: handle error
    return null;
  }
};

const signUp = async (
  username: string,
  email: string,
  password: string,
  password2: string,
) => {
  const url = `${API_URL}/auth/register`;
  const payload = { username, email, password, password2 };
  try {
    return postAsync(url, payload);
  } catch (error) {
    // TODO: handle error
    return null;
  }
};

export { categories, searchRooms, getRoom, login, signUp };
