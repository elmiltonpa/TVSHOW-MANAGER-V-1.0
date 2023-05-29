import axios from "axios";

const APIURL = import.meta.env.VITE_API_URL + "/api/register";

const register = async (credentials) => {
  const request = await axios.post(APIURL, credentials);
  return request;
};

export default register;
