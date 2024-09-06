import { axiosInstance } from "../axiosInstance"
import { EndPoints } from "../endpoints"

export const loginServcie = async(req: any) => {
    const res = axiosInstance.post(EndPoints.Authentication.Authenticate, req);
    return res;
}

export const registrationServcie = async(req: any) => {
    const res = axiosInstance.post(EndPoints.Authentication.Register, req);
    return res;
}