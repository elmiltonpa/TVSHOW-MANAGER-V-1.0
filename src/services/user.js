import axios from "axios";

// const baseURL = "http://localhost:3002/api/users";
const baseURL = "https://backend-tvshowmanagerv2.vercel.app/api/users";

const getUser = async (username) => {
  const request = await axios.get(baseURL + "/" + username);
  return request.data;
};

export default getUser;
