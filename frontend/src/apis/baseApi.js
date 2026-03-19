const baseUrl = import.meta.env.DEV
  ? import.meta.env.VITE_API_DEV
  : import.meta.env.VITE_API_PROD;

export default baseUrl;
