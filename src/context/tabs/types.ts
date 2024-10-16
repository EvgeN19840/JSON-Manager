export interface ITabsContext {
  activeTab: string,
  setActiveTab: (data: string) => void;
  handleTabChange: (_: React.SyntheticEvent | null, newValue: string) => void

}
