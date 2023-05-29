import axios from "axios";

const APIURL = "https://backend-tvshowmanager.vercel.app/api/users";

const getUser = async (username) => {
  const request = await axios.get(APIURL + "/" + username);
  return request.data;
};

export default getUser;
