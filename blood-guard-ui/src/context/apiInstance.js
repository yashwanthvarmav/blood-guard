import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://20.151.88.106:3000/api",
  baseURL: "http://localhost:3001/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
