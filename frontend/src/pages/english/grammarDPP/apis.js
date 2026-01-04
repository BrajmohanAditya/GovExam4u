// this the place where frontend api calls backend "app.js"
const apis = () => {
  const baseUrl = import.meta.env.DEV
    ? import.meta.env.VITE_API_DEV
    : import.meta.env.VITE_API_PROD;

  const list = {
    addQuize: `${baseUrl}/grammarDPP/addQuize`,
    getQuiz: `${baseUrl}/grammarDPP/getQuiz`,
    submitTest: `${baseUrl}/grammarDPP/submitTest`,
  };
  return list;
};
export default apis;
