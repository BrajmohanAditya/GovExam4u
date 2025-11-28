// this the place where frontend api calls backend "app.js"
const apis = () => {
  const baseUrl = import.meta.env.DEV
    ? import.meta.env.VITE_API_DEV
    : import.meta.env.VITE_API_PROD;

  const list = {
    addCard: `${baseUrl}/liveMock/addCard`,
    getCards: `${baseUrl}/liveMock/getCards`,
  };
  return list;
};
export default apis;
