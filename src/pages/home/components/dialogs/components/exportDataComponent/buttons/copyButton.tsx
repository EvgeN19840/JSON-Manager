import { useNotification } from "@/hooks/useNotification";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import React from "react";

interface ICopyButtonProps {
  textToCopy: string | null;
}

export const CopyButton: React.FC<ICopyButtonProps> = ({ textToCopy }) => {
  const { showNotification } = useNotification();

  const onClick = async () => {
    if (textToCopy) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        showNotification("Text successfully copied to clipboard!", "success");
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <ContentCopyIcon
      onClick={onClick}
      sx={{
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.1)",
        },
        transition: "transform 0.2s ease-in-out",
      }}
    />
  );
};
