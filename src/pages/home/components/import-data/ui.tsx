import { Box, Button, Dialog, TextField } from "@mui/material";
import { useState } from "react";
import { SetDataJSON } from "./components/setDataJSON";

export const ImportData = ({ setData }: { setData: (value: ITypeJSON) => void }) => {
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
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        employee data
      </Button>
      <Dialog fullWidth sx={{ height: '80vh' }} open={open} onClose={handleClose}>
        <Box sx={{height:'600px',p:'1rem'}}>
          <TextField multiline rows={20} sx={{ height: '100%', width: '100%' }} /> контрориуемый инпут 
        </Box>

      </Dialog>
    </>

  )
};
// return (
//   <Box>
//     {/* <Typography variant="subtitle1" component="div">
//         Selected: {selectedValue}
//       </Typography> */}
//     {/* <br /> */}
//    
//     {/* <SetDataJSON
//         selectedValue={selectedValue}
//         open={open}
//         onClose={handleClose}
//       /> */}
//   </Box>
// );