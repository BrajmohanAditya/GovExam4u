// this the place where frontend api calls backend "app.js"
const schoolQuizApi = () => {
  const baseUrl = import.meta.env.DEV
    ? import.meta.env.VITE_API_DEV
    : import.meta.env.VITE_API_PROD;

  const list = {
    addQuize: `${baseUrl}/schoolQuiz/addQuize`,
    getQuiz: `${baseUrl}/schoolQuiz/getQuiz`,
    submitTest: `${baseUrl}/schoolQuiz/submitTest`,
    verifyAttempt: `${baseUrl}/schoolQuiz/verifyAttempt`,
    leaderboard: `${baseUrl}/schoolQuiz/leaderboard`,
    lockStatus: `${baseUrl}/schoolQuiz/lock-status`,

    // 🔐 LOCK APIs (IMPORTANT)   
    isLocked: (setName) =>
      `${baseUrl}/schoolQuiz/is-locked/${encodeURIComponent(setName)}`,

    toggleLock: (setName) =>
      `${baseUrl}/schoolQuiz/toggle-lock/${encodeURIComponent(setName)}`,
    // 🔴 LIVE APIs
    isLive: (setName) =>
      `${baseUrl}/schoolQuiz/is-live/${encodeURIComponent(setName)}`,

    toggleLive: (setName) =>
      `${baseUrl}/schoolQuiz/toggle-live/${encodeURIComponent(setName)}`,

    liveStatus: `${baseUrl}/schoolQuiz/live-status`,

    // Winner APIs
    declareWinner: (setName) =>
      `${baseUrl}/schoolQuiz/declare-winner/${encodeURIComponent(setName)}`,
    getWinner: (setName) =>
      `${baseUrl}/schoolQuiz/get-winner/${encodeURIComponent(setName)}`,
    allWinners: `${baseUrl}/schoolQuiz/all-winners`,
    deleteSet: (setName) =>
      `${baseUrl}/schoolQuiz/delete-set/${encodeURIComponent(setName)}`,

    // Timing APIs
    getTime: (setName) =>
      `${baseUrl}/schoolQuiz/get-time/${encodeURIComponent(setName)}`,
    updateTime: (setName) => 
      `${baseUrl}/schoolQuiz/update-time/${encodeURIComponent(setName)}`,
    timeStatus: `${baseUrl}/schoolQuiz/time-status`,
  };
  return list;
};
export default schoolQuizApi;
