import { Box, Button } from "@mui/material";
import React from "react";

interface ICopyButtonProps {
  textToCopy: string | null;
}

export const CopyButton: React.FC<ICopyButtonProps> = ({ textToCopy }) => {
  const onClick = async () => {
    if (!textToCopy) {
      alert("Nothing to copy!");
      return;
    }

    try {
      await navigator.clipboard.writeText(textToCopy);
      alert("You did it!");
    } catch (err) {
      console.error("You didn't it!", err);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
      <Button variant="contained" onClick={onClick}>
        Copy
      </Button>
    </Box>
  );
};
