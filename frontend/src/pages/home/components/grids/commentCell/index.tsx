import { useState } from 'react'
import { InputField } from '@/shared/inputField'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { IEmployee } from '@/types/json'
import { useDataStateContext } from '@/pages/home/hooks/useDataStateContext'
import { Box } from '@mui/material'

interface Props {
  params: GridRenderCellParams<IEmployee>
}

export const CommentCell: React.FC<Props> = ({ params }) => {
  const { setData } = useDataStateContext()
  const [localValue, setLocalValue] = useState(params.row.comment || '')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newComment = e.target.value
    setLocalValue(newComment)

    setData(prev => {
      if (!prev?.employees) return prev

      const updatedEmployees = prev.employees.map(emp =>
        emp.eId === params.row.eId ? { ...emp, comment: newComment } : emp
      )

      return {
        ...prev,
        employees: updatedEmployees
      }
    })
  }

  return (
    <Box onKeyDown={e => e.stopPropagation()} width='100%'>
      <InputField value={localValue} onChange={handleChange} placeholder='Type your comment...' noBorderRadius />
    </Box>
  )
}
