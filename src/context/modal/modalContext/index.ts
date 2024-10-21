import { createContext } from "react";
import { IModalTypeContext } from "../types";

export const ModalContext = createContext<IModalTypeContext | null>(null);
