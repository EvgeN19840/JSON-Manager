import { Typography, Box } from "@mui/material";
import { FC, memo } from "react";
import { theme } from "../../../../customTheme";

export const Header: FC<{ title: string }> = memo((props) => (
  <Box 
  sx={{
    position: 'fixed',   
    top: 0,             
    left: 0,          
    width: "100%",      
    bgcolor: "#004D40",  
    padding: "18px",    
    boxShadow: theme.shadows[6], 
    borderBottom: `3px solid #00796B`, 
  }}
  >
    <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
      {props.title}
    </Typography>
  
  </Box>
));
