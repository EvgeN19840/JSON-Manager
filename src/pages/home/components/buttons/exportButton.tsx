import { Button } from "@mui/material";

interface IExportButtonsProps {
  onClick: () => void;
}

export const ExportButton: React.FC<IExportButtonsProps> = ({
  onClick,
}) => {
  return (
    <Button variant="contained" onClick={onClick} >
      Export
    </Button>
  );
};
