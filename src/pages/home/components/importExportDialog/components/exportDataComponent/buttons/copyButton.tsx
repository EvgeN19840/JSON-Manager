import { useSnackbar } from "@/context";
import { Box, Button } from "@mui/material";
import React from "react";

interface ICopyButtonProps {
  textToCopy: string | null;
}

export const CopyButton: React.FC<ICopyButtonProps> = ({ textToCopy }) => {
  const { showSnackbar } = useSnackbar();

  const onClick = async () => {
    if (textToCopy) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        showSnackbar("Text successfully copied to clipboard!", 'success')
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
      <Button variant="contained" onClick={onClick}>
        Copy
      </Button>
    </Box>
  );
};
