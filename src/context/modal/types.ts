

export interface IModalType {
  source: "Export data" | "Import data" | null;
  setSource: (data: "Export data" | "Import data" | null) => void;
  isDialogOpen: boolean;
  setDialogOpen: (data: boolean) => void;
  isEditDialogOpen: boolean;
  setEditDialogOpen: (open: boolean) => void;


}
