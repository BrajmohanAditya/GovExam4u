// this the place where frontend api calls backend "app.js"
const apis = () => {
  const baseUrl = import.meta.env.DEV
    ? import.meta.env.VITE_API_DEV
    : import.meta.env.VITE_API_PROD;

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
