// src/hooks/useAxiosSecure.js
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://evenzaa-server.vercel.app", //root api
  // baseURL: "http://localhost:3000", //root api
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token globally
axiosSecure.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("user_access_token"); // token from local storage
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Reusable function
const useAxiosSecure = () => axiosSecure;

export default useAxiosSecure;
