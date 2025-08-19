import axios from "axios";

const api = axios.create({
  baseURL: "https://myapi.govexam4u.com",  // 👈 yaha tera backend ka real URL
});

export default api;
