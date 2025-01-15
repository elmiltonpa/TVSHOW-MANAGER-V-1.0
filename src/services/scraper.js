import axios from "axios";


const APIURL = "https://backend-tvshowmanager.vercel.app/api/scraper";

const scraper = async (credentials) => {
  const request = await axios.post(`${APIURL}/save`, credentials);
  return request;
};

const getLinks = async (credentials) => {
  const { idSerie, username } = credentials;
  const request = await axios.get(`${APIURL}/links`, {
    params: { idSerie, username }
  });
  return request;
}

export default { scraper, getLinks };