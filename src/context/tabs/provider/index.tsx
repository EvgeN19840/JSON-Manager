// ** React
import { ReactNode, useState } from "react";

// ** Context
import { TabsContext } from "../tabsContext";

// ** Types
import { TabType } from "../types";


export const TabsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("1");

  const handleTabChange = (
    _: React.SyntheticEvent | null,
    newValue: TabType
  ) => {
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
