// ** React
import { useContext } from "react";

// ** Context
import { NotificationContext } from '@/core/context/snackBar/notificationContext'


export const useNotification = () => {
  const context = useContext(NotificationContext);
  return context;
};
