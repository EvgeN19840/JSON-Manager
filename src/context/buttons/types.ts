export type IButtons = "Export data" | "Import data" | null;

export interface IButtonContext {
  handleClickOpenFromGrid: (actionType: IButtons) => void;
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
  source: IButtons | null;
  hasData: boolean;
}
