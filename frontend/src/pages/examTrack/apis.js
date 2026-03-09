const apis = () => {
  const baseUrl = import.meta.env.DEV
    ? import.meta.env.VITE_API_DEV
    : import.meta.env.VITE_API_PROD;

  const list = {
    getExam: `${baseUrl}/examTrack`,
    editUpdate: `${baseUrl}/examTrack/${id}/edit`
  };
  return list;
};
export default apis;