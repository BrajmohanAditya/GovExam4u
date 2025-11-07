
const apis = () => {
  const baseUrl = "http://localhost:8080";
  const list = {
    registerUser: `${baseUrl}/users/register`,
    loginUser: `${baseUrl}/users/login`,
    userProfile: `${baseUrl}/users/`,
    logoutUser: `${baseUrl}/users/logout`,
    getAccess: `${baseUrl}/users/access`,
    forgotPassword: `${baseUrl}/users/forgot-password`,
    verifyOtp: `${baseUrl}/users/verify-otp`,
    getTime: `${baseUrl}/users/get-time`,
    updatePassword: `${baseUrl}/users/update-password`,
  };
  return list;
};
export default apis; 
