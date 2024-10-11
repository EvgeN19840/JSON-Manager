import { theme } from "@/customTheme";

export const StylesgridProps = {
  marginTop: "20px",
  minHeight: "250px",
  width: "100%",  
  bgcolor: theme.palette.background.default,  
  borderRadius: "12px",
  boxShadow: theme.shadows[4],
  padding: "16px",
  display: "flex",
  border: `2px solid ${theme.palette.primary.main}`, 
};
