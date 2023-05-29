import axios from "axios";

const APIURL = "https://backend-tvshowmanager.vercel.app/api/register";

const register = async (credentials) => {
  const request = await axios.post(APIURL, credentials);
  return request;
};

export default register;
