// ** React
import { createContext } from "react";

// ** Types
import { INotificationContextProps } from "../types";

export const NotificationContext = createContext<INotificationContextProps>({
    showNotification: () => { },
});
