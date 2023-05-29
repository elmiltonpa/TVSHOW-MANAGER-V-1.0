import axios from "axios";

const APIURL = "https://backend-tvshowmanager.vercel.app/api/login";

const login = async (credentials) => {
  const request = await axios.post(APIURL, credentials);
  return request.data;
};

export default login;
