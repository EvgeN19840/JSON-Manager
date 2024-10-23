// ** Forms Imports
import {  Control } from "react-hook-form";

export interface FormInputProps {
    name: string;
    label: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>;
    errorMessage?: string;
    type?: string;
    rules?: object;
}