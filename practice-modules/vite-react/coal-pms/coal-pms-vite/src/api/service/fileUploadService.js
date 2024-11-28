import { axiosInstance } from "../axiosInstance";
import Endpoint from '../endpoint.json'

export const uploadSingleFileService = async(req) => {
    const res = await axiosInstance.post(Endpoint.FileUpload.UploadSingleFile, req);
    return await (res).data;
}