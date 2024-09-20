import { axiosInstance } from "../axiosInstance"

export const registerUserService = async (req) => {
    const res = await axiosInstance.post('/register', req);
    return res;
}