import React, { useState, ReactNode } from "react";
import { NotificationType } from "../types";
import { NotificationContext } from "../notificationContext";
import { SnackbarComponent } from "../snackbarComponent";


export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [notificationType, setNotificationType] = useState<NotificationType | undefined>();

  const showNotification = (message: string, type: NotificationType) => {
    setMessage(message);
    setNotificationType(type);
    setOpen(true);
  };

  const closeNotification = () => {
    setOpen(false);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notificationType && (
        <SnackbarComponent
          open={open}
          message={message}
          type={notificationType}
          onClose={closeNotification}
        />
      )}
    </NotificationContext.Provider>
  );
};
