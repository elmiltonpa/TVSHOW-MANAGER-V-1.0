import axios from "axios";

const baseURL = "http://localhost:3002/api/login";
// const baseURL = "https://backend-tvshowmanagerv2.vercel.app/api/login";

const login = async (credentials) => {
  const request = await axios.post(baseURL, credentials);
  return request.data;
};

export default login;
