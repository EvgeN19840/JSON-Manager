import { createContext } from "react";
import { INotificationContextProps } from "../types";

export const NotificationContext = createContext<INotificationContextProps>({
    showNotification: () => { },
});
