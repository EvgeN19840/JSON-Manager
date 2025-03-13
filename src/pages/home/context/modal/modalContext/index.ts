// ** React
import { createContext } from "react";

// ** Types
import { IModalTypeContext } from "../types";

export const ModalContext = createContext<IModalTypeContext | null>(null);
