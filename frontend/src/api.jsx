import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:8080"
      : "https://govexam4ubackend.onrender.com",
});

export default api;
