import { createContext } from "react";
import { NotificationType } from "../../../types";


interface NotificationContextProps {
    showNotification: (message: string, type: NotificationType) => void;
}

export const NotificationContext = createContext<NotificationContextProps>({
    showNotification: () => { },
});
