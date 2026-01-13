// this the place where frontend api calls backend "app.js"
const apis = () => {
  const baseUrl = import.meta.env.DEV
    ? import.meta.env.VITE_API_DEV
    : import.meta.env.VITE_API_PROD;

  const list = {
    addQuize: `${baseUrl}/grammarDPP/addQuize`,
    getQuiz: `${baseUrl}/grammarDPP/getQuiz`,
    submitTest: `${baseUrl}/grammarDPP/submitTest`,
    verifyAttempt: `${baseUrl}/grammarDPP/verifyAttempt`,
    leaderboard: `${baseUrl}/grammarDPP/leaderboard`,

    // 🔐 LOCK APIs (IMPORTANT)
    isLocked: (setName) =>
      `${baseUrl}/grammarDPP/is-locked/${encodeURIComponent(setName)}`,

    toggleLock: (setName) =>
      `${baseUrl}/grammarDPP/toggle-lock/${encodeURIComponent(setName)}`,
  };
  return list;
};
export default apis;
