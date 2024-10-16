import { IDialog } from "@/pages/home/components/importExportButtons/types";


export interface IModalType {
  source: IDialog
  setSource: (data: IDialog) => void;
  isDialogOpen: boolean;
  setDialogOpen: (data: boolean) => void;
  isEditDialogOpen: boolean;
  setEditDialogOpen: (open: boolean) => void;
  handleClickOpenFromGrid: (actionType: IDialog) => void;


}
