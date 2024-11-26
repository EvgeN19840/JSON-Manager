export interface FormFooterProps {
    cancelButtonText: string;
    actionButtonText: string;
    showSecondButton: boolean;
    canAddBaseEmployee?: boolean;
    addBaseEmployee?: () => void;
    buttonAction?: () => void;
    source: "employeeDetails" | "general";
}