export interface ICustomDialog {
    children: React.ReactNode;
    open: boolean;
    onClose: () => void
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | false;
}