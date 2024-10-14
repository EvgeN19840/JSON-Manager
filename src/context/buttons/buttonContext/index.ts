import { createContext } from "react";
import { IButtonContext } from "../types";


export const ButtonContext = createContext<IButtonContext>({
  handleClickOpenFromGrid: () => {},
  openDialog: false,
  setOpenDialog: () => {},
  source: null,
  hasData: false,  
});
