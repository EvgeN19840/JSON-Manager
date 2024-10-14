import { createContext } from "react";
import { DataContextType } from "../types";


export const DataStateContext = createContext<DataContextType | null>(null);
