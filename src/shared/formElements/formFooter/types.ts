export interface FormFooterProps {
    cancelButtonText: string;
    actionButtonText: string;
    canAddBaseEmployee?: boolean;
    showSecondButton: boolean;
    addBaseEmployee?: (firstName: string) => void;
    buttonAction?: () => void;
    source: "employeeDetails" | "general" | "duplicate";
}