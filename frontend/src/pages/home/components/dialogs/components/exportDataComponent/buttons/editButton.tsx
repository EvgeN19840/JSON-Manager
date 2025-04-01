// ** React
import React from 'react'

// ** MUI
import EditIcon from '@mui/icons-material/Edit'

// ** Types
import { IEditButtonProps } from './types'

export const EditButton: React.FC<IEditButtonProps> = ({ onClick }) => {
  return (
    <EditIcon
      fontSize='small'
      onClick={onClick}
      sx={{
        cursor: 'pointer'
      }}
    />
  )
}
