import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
export function ToastAlert(
  message: string,
  type: string,
  time: number = 5000,
  position: string = "bottom-right"
) {
  // @ts-ignore
  toast[type](message, {
    position,
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}
