import { Box, Button } from "@mui/material";

interface IDownloadButtonProps {
  onClick: () => void;
}

export const DownloadButton: React.FC<IDownloadButtonProps> = ({
  onClick,
}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
      <Button variant="contained" onClick={onClick}>
        Download
      </Button>
    </Box>
  );
};
