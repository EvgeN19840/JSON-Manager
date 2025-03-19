export interface FormFooterProps {
    cancelButtonText: string;
    actionButtonText: string;
    buttonAction: () => void;
    showSecondButton?: boolean;
    source: "employeeDetails" | "general" | "duplicate";
    middleContent?: React.ReactNode;
}