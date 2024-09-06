import { toast } from "react-toastify";

export const TOAST_TYPE = {
    SUCCESS: "success",
    ERROR: "error",
    INFO: "info",
    WARNING: "warning"
}


export const toastAlert = (type: string, msg: string) => {
    if (type == TOAST_TYPE.SUCCESS) {
        return toast.success(msg);
    }
    else if (type == TOAST_TYPE.ERROR) {
        return toast.error(msg);
    }
    else if (type == TOAST_TYPE.WARNING) {
        return toast.warn(msg);
    }
    else {
        return toast.info(msg);
    }

}