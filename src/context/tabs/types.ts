export type TabType = "1" | "2";
export interface ITabsContext {
  activeTab: string,
  setActiveTab: (data: TabType) => void;
  handleTabChange: (_: React.SyntheticEvent | null, newValue: TabType) => void

}
