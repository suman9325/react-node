import { axiosInstance } from "../axiosInstance";
import Endpoint from '../endpoint.json';

export const getAllCountryService = async () => {
    const res = await axiosInstance.get(Endpoint.Dropdown.GetAllCountry);
    return await (res).data;
}

export const getAllStateByCountryService = async (req) => {
    const res = await axiosInstance.post(Endpoint.Dropdown.GetAllStateByCountry, req);
    return await (res).data;
}