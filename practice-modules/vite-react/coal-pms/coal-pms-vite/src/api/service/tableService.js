import { axiosInstance } from "../axiosInstance";
import Endpoint from '../endpoint.json'

export const getAllUsersService=async()=>{
    const res = await axiosInstance.get(Endpoint.Table.Users);
    return await(res).data
}