import axios from 'axios';

const api = axios.create({
  baseURL: process.env.BASEURL_MKAUTH_API,
});

export default api;
