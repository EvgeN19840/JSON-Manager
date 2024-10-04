import { Box, Button } from "@mui/material";

interface IEmployeeDataButtonProps {
  onClick: () => void;
}

export const DownloadButton: React.FC<IEmployeeDataButtonProps> = ({
  onClick,
}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
      <Button variant="outlined" onClick={onClick}>
        Download
      </Button>
    </Box>
  );
};
