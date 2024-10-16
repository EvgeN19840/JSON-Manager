import { ReactNode, useState } from "react";
import { TabsContext } from "../tabsContext";

export const TabsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>("1");

  const handleTabChange = (_: React.SyntheticEvent | null, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <TabsContext.Provider
      value={{
        activeTab,
        setActiveTab,
        handleTabChange,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};
