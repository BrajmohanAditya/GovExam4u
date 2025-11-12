
const apis = () => {
const baseUrl = "https://govexam4ubackend.onrender.com";
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
    verifyUser: `${baseUrl}/users/verify`,
  };
  return list;
};
export default apis; 
