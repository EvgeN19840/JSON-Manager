import { createContext } from "react";
import { INotificationType } from "../types";



interface NotificationContextProps {
    showNotification: (message: string, type: INotificationType) => void;
}

export const NotificationContext = createContext<NotificationContextProps>({
    showNotification: () => { },
});
