import axios from "axios";

/*
Central API configuration
*/

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

/*
Attach JWT token automatically
*/
api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem("userInfo");

  if (userInfo) {
    const token = JSON.parse(userInfo).token;

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;