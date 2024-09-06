import { axiosInstance } from "../axiosInstance"
import { EndPoints } from "../endpoints"

export const getAllUserListService = (req?: any) => {
    const res = axiosInstance.post(EndPoints.Users.ListUser, req);
    return res;
}

export const createUserService = (req?: any) => {
    const res = axiosInstance.post(EndPoints.Users.CreateUser, req);
    return res;
}