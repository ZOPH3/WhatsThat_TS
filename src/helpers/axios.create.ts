import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://10.0.2.2:3333/api/1.0.0",
    headers: {
        'Content-Type': 'application/json'
    }
});