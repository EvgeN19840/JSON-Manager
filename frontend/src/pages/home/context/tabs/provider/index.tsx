// ** React
import { ReactNode, useState } from "react";

// ** Context
import { TabsContext } from "../tabsContext";

// ** Types
import { TabDetails, TabType } from "../types";


export const TabsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("1");
  const [activeDetailTab, setActiveDetailTab] = useState<TabDetails>("1");

  const handleTabChange = (
    _: React.SyntheticEvent | null,
    newValue: TabType
  ) => {
    setActiveTab(newValue);
  };

  const handleDetailTabChange = (
    _: React.SyntheticEvent | null,
    newValue: TabDetails
  ) => {
    setActiveDetailTab(newValue);
  };


  return (
    <TabsContext.Provider
      value={{
        activeTab,
        setActiveTab,
        handleTabChange,
        activeDetailTab,
        setActiveDetailTab,
        handleDetailTabChange
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};
