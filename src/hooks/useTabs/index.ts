
import { TabsContext } from "@/context/tabs/tabsContext";
import { useContext } from "react";

export const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabs must be used within a TabsProvider");
  }
  return context;
};
