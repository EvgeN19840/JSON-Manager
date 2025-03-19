export type INotificationType = 'success' | 'error';
export interface INotificationContextProps {
    showNotification: (message: string, type: INotificationType) => void;
}