import { toast } from "react-toastify";

interface ApiErrorResponse {
  code?: string;
  error?: string;
  messages?: string[];
}

export function showApiErrorToast(error: any) {
  const err: ApiErrorResponse = error?.response?.data || {};

  switch (err.code) {
    case "DUPLICATE_EMAIL":
      toast.error("El correo ya está registrado.");
      break;
    case "INVALID_CREDENTIALS":
      toast.error("Correo o contraseña incorrectos.");
      break;
    case "VALIDATION_ERROR":
      if (Array.isArray(err.messages)) {
        err.messages.forEach((msg) => toast.error(msg));
      } else {
        toast.error("Hay errores en el formulario.");
      }
      break;
    default:
      toast.error(err.error || "Ocurrió un error inesperado.");
  }
}
