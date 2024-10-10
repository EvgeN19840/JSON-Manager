import { NotificationContext } from "@/pages/context/snackBar/notificationContext";
import { useContext } from "react";

export const useNotification = () => {
  const context = useContext(NotificationContext);
  return context;
};
