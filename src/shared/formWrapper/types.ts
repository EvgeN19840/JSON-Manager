export interface FormWrapperProps<T> {
  onSubmit: (data: T) => void;
    children: React.ReactNode;
  }