import axios from "axios";

const baseURL = "http://localhost:3002/api/series/apikey";

const getApiKey = async () => {
  try {
    const request = await axios.get(baseURL);
    return request.data.apikey;
  } catch (err) {
    console.log(err);
  }
};

export default getApiKey;
