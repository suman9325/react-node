import { axiosInstance } from "../axiosInstance";
import Endpoint from '../endpoint.json';

export const addUpdateUserService = async (req) => {
    const res = await axiosInstance.post(Endpoint.User.AddUpdateUser, req);
    return await (res).data;
}

export const getUserService = async (req) => {
    const res = await axiosInstance.post(Endpoint.User.GetUser, req);
    return await (res).data;
}

export const searchUserService = async (req) => {
    const res = await axiosInstance.post(Endpoint.User.SearchUser, req);
    return await (res).data;
}