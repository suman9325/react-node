import { axiosInstance } from "../axiosInstance"
import { EndPoints } from "../endpoints"

export const singleFileUploadService = (req: any) => {
    const res = axiosInstance.post(EndPoints.Dashboard.FileUpload.Single, req);
    return res;
}

export const singleFileUploadProgressService = (req: any, config: any) => {
    const res = axiosInstance.post(EndPoints.Dashboard.FileUpload.Single, req, config);
    return res;
}

export const saveEnquiryDocumentService = async (req: any) => {
    const res = axiosInstance.post(EndPoints.Dashboard.FileUpload.SaveEnquiryDocument, req);
    return (await res).data;
}

export const downloadEnquiryDocumentService = async (req: any) => {
    const res = axiosInstance.post(EndPoints.Dashboard.FileUpload.DownloadEnquiryDocument, req, { responseType: 'blob' });
    return res;
}