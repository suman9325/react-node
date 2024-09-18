// src/services/axiosInstance.js

import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://Ibmdaucthentication.mjunction.in/Api',
    timeout: 10000, // Set a timeout if needed
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    withCredentials: true
});

// You can also add interceptors here if needed
axiosInstance.interceptors.request.use(
    (config) =>
    {
        // Modify request configuration before sending it
        return config;
    },
    (error) =>
    {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) =>
    {
        // Handle responses before they reach the calling component
        return response;
    },
    (error) =>
    {
        return Promise.reject(error);
    }
);

export default axiosInstance;
