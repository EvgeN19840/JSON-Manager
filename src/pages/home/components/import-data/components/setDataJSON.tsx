import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { MyGrid } from "../../grid";

export interface DialogContentProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

export const SetDataJSON = (props: DialogContentProps) => {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Title</DialogTitle>
      <MyGrid data={data} />
    </Dialog>
  );
};
