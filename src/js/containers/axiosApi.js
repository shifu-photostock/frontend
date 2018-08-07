import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://138.68.234.86:8888',
  withCredentials: true
})

export default instance;
