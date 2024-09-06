import { axiosInstance } from "../axiosInstance"
import { EndPoints } from "../endpoints"

export const getAllEnquiryService = async () => {
    const res = axiosInstance.get(EndPoints.Dashboard.TableGridView.GetAllEnquiry);
    return (await res).data;
}

export const activeInactiveEnquiryService = async (req: any) => {
    const res = axiosInstance.post(EndPoints.Dashboard.TableGridView.ActiveInactiveEnquiry, req);
    return (await res).data;
}

export const filterActiveInactiveEnquiryService = async (req: any) => {
    const res = axiosInstance.post(EndPoints.Dashboard.TableGridView.FilterActiveInactiveEnquiry, req);
    return (await res).data;
}

export const getAllEnquiryDocumentsService = async () => {
    const res = axiosInstance.get(EndPoints.Dashboard.TableGridView.GetAllEnquiryDocuments);
    return (await res).data;
}