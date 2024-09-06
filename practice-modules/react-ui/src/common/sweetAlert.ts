import Swal from "sweetalert2";

export const sweetAlert = (req: any) => {
    return Swal.fire({
        // position: "top-end",
        icon: req.icon,
        title: req.title,
        text: req.text,
        showConfirmButton: false,
        timer: 5000
    });
}