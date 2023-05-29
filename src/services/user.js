import axios from "axios";

const APIURL = import.meta.env.VITE_API_URL + "/api/users";

const getUser = async (username) => {
  const request = await axios.get(APIURL + "/" + username);
  return request.data;
};

export default getUser;
