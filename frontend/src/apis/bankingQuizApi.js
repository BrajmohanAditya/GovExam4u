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
      `${baseUrl}/AllSubjectQuiz/is-locked/${encodeURIComponent(setName)}`,

    toggleLock: (setName) =>
      `${baseUrl}/AllSubjectQuiz/toggle-lock/${encodeURIComponent(setName)}`,
    // 🔴 LIVE APIs
    isLive: (setName) =>
      `${baseUrl}/AllSubjectQuiz/is-live/${encodeURIComponent(setName)}`,

    toggleLive: (setName) =>
      `${baseUrl}/AllSubjectQuiz/toggle-live/${encodeURIComponent(setName)}`,

    liveStatus: `${baseUrl}/AllSubjectQuiz/live-status`,
  };
  return list;
};
export default bankingQuizApi;
