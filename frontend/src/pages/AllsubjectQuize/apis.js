// this the place where frontend api calls backend "app.js"
const apis = () => {
  const baseUrl = import.meta.env.DEV
    ? import.meta.env.VITE_API_DEV
    : import.meta.env.VITE_API_PROD;

  const list = {
    addQuize: `${baseUrl}/AllSubjectQuiz/addQuize`,
    getQuiz: `${baseUrl}/AllSubjectQuiz/getQuiz`,
    submitTest: `${baseUrl}/AllSubjectQuiz/submitTest`,
    verifyAttempt: `${baseUrl}/AllSubjectQuiz/verifyAttempt`,
    leaderboard: `${baseUrl}/AllSubjectQuiz/leaderboard`,
    lockStatus: `${baseUrl}/AllSubjectQuiz/lock-status`,

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
export default apis;
