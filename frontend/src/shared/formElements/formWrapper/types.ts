export interface FormWrapperProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>; 
  children: React.ReactNode;
  title:string
}
