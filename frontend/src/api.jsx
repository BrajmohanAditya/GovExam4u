
import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:8080",

  baseURL: "https://api.govexam4u.com", // jb v koi backend call karoga wo yahi ayaga.
});


 
export default api;
 