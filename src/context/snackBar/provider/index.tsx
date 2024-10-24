// ** React
import React, { useState, ReactNode } from "react";

// ** Components
import { SnackbarComponent } from "../snackbarComponent";

// ** Context
import { NotificationContext } from "../notificationContext";

// ** Types
import { INotificationType } from "../types";



export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [notificationType, setNotificationType] = useState<INotificationType | undefined>();

  const showNotification = (message: string, type: INotificationType) => {
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
