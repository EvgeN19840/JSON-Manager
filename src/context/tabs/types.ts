export type ITabs = "Export data" | "Import data" | null;

export interface ITabContext {
  handleClickOpenFromGrid: (actionType: ITabs) => void;
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
  source: ITabs | null;
  hasData: boolean;
}
