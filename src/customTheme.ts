import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    text: {
      primary: "#2196f3",
      secondary: 'yellow'
    },
    background: {
      default: "#f0f0f0", 
      paper: "#ffffff",   
    },
    
  },
  typography: {
    allVariants: {
      color: "black",
    },
  },
});
