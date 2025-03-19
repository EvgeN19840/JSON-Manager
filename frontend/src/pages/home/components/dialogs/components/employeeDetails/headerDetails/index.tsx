// ** React
import { ReactNode } from 'react';

// ** MUI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface HeaderDetailsProps {
  title: string;
  children?: ReactNode;
  pointer?: boolean;
}

export const HeaderDetails = ({
  title,
  children,
  pointer = false,
}: HeaderDetailsProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: pointer ? 'pointer' : 'default'
      }}
    >
      <Typography
        sx={{
          width: '100%',
          fontWeight: 600,
          fontSize: '0.7rem',
          letterSpacing: '0.17px',
          textTransform: 'uppercase',
          textAlign: "center",
          lineHeight: '13px',
          pointerEvents: 'none',
          whiteSpace: 'pre-line',
          userSelect: 'none'
        }}
      >
        {title}
      </Typography>
      {children && <Box sx={{ ml: 2 }}>{children}</Box>}
    </Box>
  );
};
