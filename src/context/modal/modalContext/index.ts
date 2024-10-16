import { createContext } from "react";
import { IModalType } from "../types";

export const ModalContext = createContext<IModalType | null>(null);
