import axios from 'axios';

export const axiosInstance = axios.create({
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
});