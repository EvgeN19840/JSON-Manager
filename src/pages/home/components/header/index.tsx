import { Typography, Box } from "@mui/material";
import { FC, memo } from "react";

export const Header: FC<{ title: string }> = memo((props) => (
  <Box 
  sx={{
    position: 'fixed',   
    top: 0,             
    left: 0,          
    width: "100%",      
    bgcolor: "#78a19b",
    padding: "18px",    
    borderBottom: `1px solid #00796B`, 
  }}
  >
    <Typography variant="h6" sx={{ color:"#8cc8d1" }}>
      {props.title}
    </Typography>
  
  </Box>
));
