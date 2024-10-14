import { createContext } from "react";
import { ITabContext } from "../types";


export const TabContext = createContext<ITabContext>({
  handleClickOpenFromGrid: () => {},
  openDialog: false,
  setOpenDialog: () => {},
  source: null,
  hasData: false,  
});
