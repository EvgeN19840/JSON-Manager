// ** Types
import { INotificationType } from "../types";
export interface ISnackbarComponentProps {
    open: boolean;
    message: string;
    type: INotificationType;
    onClose: () => void;
}