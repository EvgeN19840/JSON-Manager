import { Button} from "@mui/material";
import { useState } from "react";
import { SetDataJSON } from "./components/setDataJSON";

export const MyDialog = () => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      {/* <Typography variant="subtitle1" component="div">
        Selected: {selectedValue}
      </Typography> */}
      {/* <br /> */}
      <Button variant="outlined" onClick={handleClickOpen}>
        employee data
      </Button>
      <SetDataJSON
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
};
