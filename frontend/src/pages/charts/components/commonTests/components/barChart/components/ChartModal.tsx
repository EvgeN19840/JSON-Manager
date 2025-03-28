// ** React
import { useState, useEffect, FC } from 'react'

// ** Components
import { Dialog, DialogContent, DialogTitle, Typography, TextField, Button, Box } from '@mui/material'

// ** Types
import { ICharatModalData } from '../types'
import { IAddComment } from '@/pages/charts/service/types'

interface ChartModalProps {
  open: boolean
  data: ICharatModalData | null
  onClose: () => void
  setModalData: (value: null) => void
  addCommentToTest: (value: IAddComment) => Promise<void>
}

export const ChartModal: FC<ChartModalProps> = ({ setModalData, open, data, onClose, addCommentToTest }) => {
  const [comment, setComment] = useState<string>(data?.comment || '')
  const [saving, setSaving] = useState<boolean>(false)

  useEffect(() => {
    setComment(data?.comment || '')
  }, [data])

  const isChanged = comment !== (data?.comment || '')

  const handleSave = async () => {
    if (!data) return
    setSaving(true)
    addCommentToTest({
      data: { comment, id: data.id },
      type: data.type as 'main_test' | 'common_test'
    }).then(() => {
      setSaving(false)
      onClose()
    })
  }

  return (
    <Dialog TransitionProps={{ onExited: () => setModalData(null) }} maxWidth={'lg'} open={open} onClose={onClose}>
      <DialogTitle>Test Info</DialogTitle>
      <DialogContent sx={{ width: '400px' }}>
        <Typography>Test: {data?.label}</Typography>
        <Typography>Time: {data?.value}</Typography>
        <Typography>Date: {data?.date}</Typography>
        <Box mt={2}>
          <TextField
            label='Comment'
            multiline
            fullWidth
            maxRows={6}
            minRows={3}
            value={comment}
            onChange={e => setComment(e.target.value)}
            variant='outlined'
          />
        </Box>
        <Box mt={2} display='flex' justifyContent='flex-end'>
          <Button variant='contained' color='primary' disabled={!isChanged || saving} onClick={handleSave}>
            {'Save'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
