import { Employee } from "@/const/types";

export interface EditFormProps {
    onClose: () => void;
    employee: Employee | null;
}

export interface EditButtonProps {
    onClick: () => void;
}


export interface EditDialogProps {
    open: boolean;
    onClose: () => void;
    employee: Employee | null;

}