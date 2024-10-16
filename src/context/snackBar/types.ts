export type INotificationType = 'success' | 'error' | 'info' | 'warning';
export interface INotificationContextProps {
    showNotification: (message: string, type: INotificationType) => void;
}