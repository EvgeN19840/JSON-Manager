import { NotificationContext } from "@/shared/context/notificationContext";
import { useContext } from "react";

export const useNotification = () => {
  const context = useContext(NotificationContext);
  return context;
};
