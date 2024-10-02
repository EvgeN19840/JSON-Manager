import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { ITypeJSON } from "../../const/types";

export const ImportData = ({
  setData,
}: {
  setData: (value: ITypeJSON) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setInputValue(value);
  };

  const sendData = () => {
    try {
      const parsedData: ITypeJSON = JSON.parse(inputValue);
      setData(parsedData);
      setOpen(false);
      setInputValue("");
    } catch (e) {
      console.error("Invalid JSON format", e);
      alert("Invalid JSON data. Please correct and try again.");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        employee data
      </Button>
      <Dialog
        fullWidth
        sx={{ height: "80vh" }}
        open={open}
        onClose={handleClose}
      >
        <Box
          sx={{
            p: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Import Data
          </Typography>
          <TextField
            multiline
            rows={20}
            sx={{ flexGrow: 1 }}
            placeholder="Paste your JSON data here"
            onChange={handleInputChange}
            value={inputValue}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Button variant="contained">Import</Button>
            <Button variant="contained" onClick={sendData}>
              Save
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};
