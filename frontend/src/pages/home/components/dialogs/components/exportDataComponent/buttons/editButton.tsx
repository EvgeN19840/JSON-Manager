// ** React
import React from "react";



// ** MUI
import EditIcon from '@mui/icons-material/Edit';


interface IEditButtonProps {
  onClick: () => void;
}

export const EditButton: React.FC<IEditButtonProps> = ({ onClick }) => {
 
  return (
    <EditIcon fontSize="small"
      onClick={onClick}
      sx={{
        cursor: "pointer",
      
      }}
    />
  );
};
