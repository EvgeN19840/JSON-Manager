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
      bgcolor:  theme.palette.background.paper,  
      padding: "10px",    
      boxShadow: 1,      
    }}
  >
    <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
      {props.title}
    </Typography>
  
  </Box>
));
