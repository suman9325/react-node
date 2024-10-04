import { axiosInstance } from "../axiosInstance";
import Endpoint from '../endpoint.json';

export const getAllCountryService = async () => {
    const res = axiosInstance.get(Endpoint.Dropdown.GetAllCountry);
    return await res;
}

export const getAllStateByCountryService = async (req) => {
    const res = axiosInstance.post(Endpoint.Dropdown.GetAllStateByCountry, req);
    return await res;
}