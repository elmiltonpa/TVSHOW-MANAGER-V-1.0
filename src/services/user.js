import axios from "axios";

// const baseURL = "http://localhost:3002/api/users";
const baseURL = `${import.meta.env.VITE_API_URL}/api/users`;

const getUser = async (username) => {
  const request = await axios.get(baseURL + "/" + username);
  return request.data;
};

export default getUser;
