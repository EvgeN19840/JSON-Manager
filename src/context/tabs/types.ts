export type TabType = "1" | "2";
export type TabDetails = "1" | "2" | "3";

export interface ITabsContext {
  activeTab: TabType,
  setActiveTab: (data: TabType) => void;
  handleTabChange: (_: React.SyntheticEvent | null, newValue: TabType) => void;
  activeDetailTab: TabDetails;
  setActiveDetailTab: (data: TabDetails) => void;
  handleDetailTabChange: (_: React.SyntheticEvent | null, newValue: TabDetails) => void;
}
