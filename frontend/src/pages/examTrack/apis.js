const apis = () => {
  const baseUrl = import.meta.env.DEV
    ? import.meta.env.VITE_API_DEV
    : import.meta.env.VITE_API_PROD;

  const list = {
    getExam: `${baseUrl}/examTrack`,
    fetchData: (id) => `${baseUrl}/examTrack/${id}/edit`,
    addExam: `${baseUrl}/examTrack`,
    editExam: (id) => `${baseUrl}/examTrack/${id}`,
    deleteExam: (id) => `${baseUrl}/examTrack/${id}`,
  };
  return list;
};
export default apis;