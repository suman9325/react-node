import { iState } from "../../interface/iDropDown";
import { axiosInstance } from "../axiosInstance"
import { EndPoints } from "../endpoints"

export const getAllCountryService = async () => {
    const res = axiosInstance.get(EndPoints.Dashboard.DropDown.GetAllCountry);
    return res;
}

export const getAllStateByCountryService = async (req: any) => {
    const res = await axiosInstance.post(EndPoints.Dashboard.DropDown.GetAllStateByCountry, req);
    return res;
}
export const getAllCityByStateService = async (req: any) => {
    const res = await axiosInstance.post(EndPoints.Dashboard.DropDown.GetAllCityByState, req);
    return res;
}
export const getAllFilmService = async () => {
    const res = await axiosInstance.get(EndPoints.Dashboard.DropDown.FilmList);
    return res;
}