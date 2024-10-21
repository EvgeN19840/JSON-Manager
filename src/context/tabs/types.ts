export type TabType = "1" | "2";

export interface ITabsContext {
  activeTab: TabType,
  setActiveTab: (data: TabType) => void;
  handleTabChange: (_: React.SyntheticEvent | null, newValue: TabType) => void
}
