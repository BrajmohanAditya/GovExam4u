
const apis = () => {
  const baseUrl = "http://localhost:8080";
  const list = {
    registerUser: `${baseUrl}/users/register`,
    loginUser: `${baseUrl}/users/login`,
    userProfile: `${baseUrl}/users/`,
  };
  return list;
};
export default apis; 
