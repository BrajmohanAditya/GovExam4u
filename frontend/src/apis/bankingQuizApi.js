// this the place where frontend api calls backend "app.js"
const bankingQuizApi = () => {
  const baseUrl = import.meta.env.DEV
    ? import.meta.env.VITE_API_DEV
    : import.meta.env.VITE_API_PROD;

  const list = {
    addQuize: `${baseUrl}/BankingQuiz/addQuize`,
    getQuiz: `${baseUrl}/BankingQuiz/getQuiz`,
    submitTest: `${baseUrl}/BankingQuiz/submitTest`,
    verifyAttempt: `${baseUrl}/BankingQuiz/verifyAttempt`,
    leaderboard: `${baseUrl}/BankingQuiz/leaderboard`,
    lockStatus: `${baseUrl}/BankingQuiz/lock-status`,

    // 🔐 LOCK APIs (IMPORTANT)   
    isLocked: (setName) =>
      `${baseUrl}/BankingQuiz/is-locked/${encodeURIComponent(setName)}`,

    toggleLock: (setName) =>
      `${baseUrl}/BankingQuiz/toggle-lock/${encodeURIComponent(setName)}`,
    // 🔴 LIVE APIs
    isLive: (setName) =>
      `${baseUrl}/BankingQuiz/is-live/${encodeURIComponent(setName)}`,

    toggleLive: (setName) =>
      `${baseUrl}/BankingQuiz/toggle-live/${encodeURIComponent(setName)}`,

    liveStatus: `${baseUrl}/BankingQuiz/live-status`,
  };
  return list;
};
export default bankingQuizApi;
