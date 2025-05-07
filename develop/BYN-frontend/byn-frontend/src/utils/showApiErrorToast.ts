import { toast } from "react-toastify";
import { ApiErrorResponse } from "../types/api";

export const showApiErrorToast = (error: unknown) => {
  const res = (error as any)?.response?.data as ApiErrorResponse;

  if (res?.code === "VALIDATION_ERROR" && Array.isArray(res.messages)) {
    res.messages.forEach((msg) => toast.error(msg));
  } else if (res?.error) {
    toast.error(res.error);
  } else {
    toast.error("Ocurrió un error inesperado");
  }
};
