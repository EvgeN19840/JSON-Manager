import { createContext } from "react";
import { ModalType } from "../types";

export const ModalContext = createContext<ModalType | null>(null);
