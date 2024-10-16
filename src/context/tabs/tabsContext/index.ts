import { createContext } from "react";
import { ITabsContext } from "../types";

export const TabsContext = createContext<ITabsContext | null>(null);
