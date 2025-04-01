import React, { useRef } from 'react'

// ** Mui
import Button from '@mui/material/Button'

// ** Types
import { TMetricsData } from '../types'
import { Box } from '@mui/material'
import { LOCAL_STORAGE_KEY } from '../constants/localStorage'

interface StressTestSettingsProps {
  setMetricsData: React.Dispatch<React.SetStateAction<TMetricsData>>
}

export const StressTestSettings: React.FC<StressTestSettingsProps> = ({  setMetricsData }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = event => {
      try {
        const importedData = JSON.parse(event.target?.result as string) as TMetricsData
        setMetricsData(prev => ({ ...prev, ...importedData }))
      } catch (error) {
        console.error('Ошибка импорта JSON:', error)
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const handleExportClick = () => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
    let dataStr
    if (stored) {
      dataStr = stored
    } else {
      dataStr = JSON.stringify(stored ?? {}, null, 2)
    }
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'metricsData.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Box>
      <Button onClick={handleImportClick} variant='contained' color='primary' style={{ marginRight: '10px' }}>
        Import
      </Button>
      <Button onClick={handleExportClick} variant='contained' color='secondary'>
        Export
      </Button>
      <input
        type='file'
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept='application/json'
        onChange={handleFileChange}
      />
    </Box>
  )
}
