import { Box, Button, Snackbar } from "@mui/material";
import React, { useState } from "react";

interface ICopyButtonProps {
  textToCopy: string | null;
}

export const CopyButton: React.FC<ICopyButtonProps> = ({ textToCopy }) => {
  const [message, setMessage] = useState<string | null>(null);
  const onClick = async () => {
    if (!textToCopy) {
      setMessage("Nothing to copy!");
      return;
    }

    try {
      await navigator.clipboard.writeText(textToCopy);
      setMessage("You did it!");
    } catch (err) {
      console.error(err);
      setMessage("You didn't it!");
    }
  };

  const action = message && (
    <Button color="inherit" size="small" onClick={() => setMessage(null)}>
      Close
    </Button>
  );
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
      <Button variant="contained" onClick={onClick}>
        Copy
      </Button>
      {message && (
        <Snackbar
          open={!!message}
          autoHideDuration={3000}
          onClose={() => setMessage(null)}
          message={message}
          action={action}
        />
      )}
    </Box>
  );
};
