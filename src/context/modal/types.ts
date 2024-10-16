

export interface ModalType {
  source: "Export data" | "Import data" | null;
  setSource: (data: "Export data" | "Import data" | null) => void;
  isDialogOpen: boolean;
  setDialogOpen: (data: boolean) => void;


}
