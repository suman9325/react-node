import axios from 'axios';

export const axiosInstance = axios.create({
    // baseURL: process.env.REACT_APP_API_BASE_URL
    baseURL: "http://localhost:5000/api/"
});