import axios from "axios";

export const axiosInstance = axios.create({
    // baseURL: 'http://localhost:5000/api/'
    baseURL: 'https://reqres.in/api/'
})