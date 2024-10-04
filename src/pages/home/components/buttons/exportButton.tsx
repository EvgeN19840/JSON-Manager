import { Button } from "@mui/material";

interface IExportButtonsProps {
  onClick: () => void;
}

export const ExportButtons: React.FC<IExportButtonsProps> = ({
  onClick,
}) => {
  return (
    <Button variant="contained" onClick={onClick} sx={{ m: 1 }}>
      Export
    </Button>
  );
};
