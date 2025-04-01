// ** React
import { createContext } from "react";

// ** Types
import { ITabsContext } from "../types";

export const TabsContext = createContext<ITabsContext | null>(null);
