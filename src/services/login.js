import axios from "axios";

const APIURL = import.meta.env.VITE_API_URL + "/api/login";

const login = async (credentials) => {
  const request = await axios.post(APIURL, credentials);
  return request.data;
};

export default login;
