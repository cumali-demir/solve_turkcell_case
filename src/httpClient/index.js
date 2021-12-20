const axios = require("axios");

const API_KEY = "178eaf17a1msh37341e4afcf9431p1c3e4cjsnc42423e775d7";
const axiosInstance = axios.create({
  // baseURL: 'https://rapidapi.com',
  timeout: 16000,
  headers: {
    "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com",
    "x-rapidapi-key": API_KEY,
  },
});
const HttpClient = {
  getRequest: ({ params, url }) => {
    return axiosInstance.get(
      `https://omgvamp-hearthstone-v1.p.rapidapi.com${url}`,
      {
        params,
      }
    );
  },
  postRequest: ({ data, url }) => {
    return axiosInstance({
      method: "post",
      url,
      data,
    });
  },
};

export default HttpClient;
