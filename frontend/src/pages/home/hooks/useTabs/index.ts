// ** React
import { useContext } from "react";

// ** Context
import { TabsContext } from '@/pages/home/context/tabs/tabsContext'

export const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabs must be used within a TabsProvider");
  }
  return context;
};
