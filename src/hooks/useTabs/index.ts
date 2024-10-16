
import { TabsContext } from "@/context/tabs/tabsContext";
import { useContext } from "react";

export const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
