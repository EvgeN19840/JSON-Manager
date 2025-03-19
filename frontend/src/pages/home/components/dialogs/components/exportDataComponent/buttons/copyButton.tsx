// ** React
import React from 'react'

// ** Hooks
import { useNotification } from '@/pages/home/hooks/useNotification'

// ** MUI
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { IModalType } from '@/pages/home/context/modal/types'

interface ICopyButtonProps {
  textToCopy: IModalType | null
}

export const CopyButton: React.FC<ICopyButtonProps> = ({ textToCopy }) => {
  const { showNotification } = useNotification()

  const onClick = async () => {
    if (textToCopy) {
      try {
        await navigator.clipboard.writeText(textToCopy)
        showNotification('Text successfully copied to clipboard!', 'success')
      } catch (err) {
        console.error(err)
      }
    }
  }
  return (
    <ContentCopyIcon
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(1.1)'
        },
        transition: 'transform 0.2s ease-in-out'
      }}
    />
  )
}
