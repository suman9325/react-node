import { axiosInstance } from "../axiosInstance"
import { EndPoints } from "../endpoints"

export const dashboardServcie = async(req?: any) => {
    const res = axiosInstance.get(EndPoints.Dashboard.ViewUser, req);
    return res;
}