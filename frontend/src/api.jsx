// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8080",

//   // baseURL: "https://api.govexam4u.com", // jb v koi backend call karoga wo yahi ayaga.
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   withCredentials: true,
// });

// export default api;
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
