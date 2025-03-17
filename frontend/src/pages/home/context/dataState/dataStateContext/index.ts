// ** React
import { createContext } from "react";

// ** Types
import { DataContextType } from "../types";


export const DataStateContext = createContext<DataContextType | null>(null);
