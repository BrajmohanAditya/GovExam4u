
import axios from "axios";

const baseURL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_DEV
    : import.meta.env.VITE_API_PROD;

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;
