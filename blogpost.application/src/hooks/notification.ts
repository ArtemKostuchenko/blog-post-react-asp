import { toast } from "sonner";

const useNotification = () => {
  const success = (message: string) =>
    toast.success(message, { position: "bottom-right" });

  const info = (message: string) =>
    toast.info(message, { position: "bottom-right" });

  const warning = (message: string) =>
    toast.warning(message, { position: "bottom-right" });

  const error = (message: string) =>
    toast.error(message, { position: "bottom-right" });

  return {
    success,
    info,
    warning,
    error,
  };
};

export default useNotification;
