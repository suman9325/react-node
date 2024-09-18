// src/services/apiService.js

import axiosInstance from './axiosInstance';

const apiService = async (method, url, data = null, config = {}) =>
{
    try
    {
        const response = await axiosInstance({
            method,
            url,
            data,
            ...config,
        });

        return response.data; // Return the data from the response
    } catch (error)
    {
        // Handle the error as needed
        console.error(`API call error on ${method.toUpperCase()} ${url}:`, error);
        throw error; // Re-throw the error to handle it in the calling component
    }
};

export default apiService;
