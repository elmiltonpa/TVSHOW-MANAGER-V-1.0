import axios from "axios";

const baseURL = "https://backend-tvshowmanagerv2.vercel.app/api/register";

// const baseURL = "http://localhost:3002/api/register";

const register = async (credentials) => {
  const request = await axios.post(baseURL, credentials);
  return request;
};

export default register;
