// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// Chart & Third-Party Imports
import { Line } from 'react-chartjs-2'
import { ChartData } from 'chart.js'

// Local Utilities & Constants
import { createLineDataset } from './utils/createLineDataset'
import { options } from './utils/options'
import { colors } from './constants/color'
import { LOCAL_STORAGE_KEY } from './constants/localStorage'

// Local Components & Types
import { StressTestSettings } from './components'
import { TMetricsData } from './types'

export const StressTest = () => {
  const [metricsData, setMetricsData] = useState<TMetricsData>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch (error) {
        console.error('Ошибка парсинга localStorage:', error)
      }
    }
    return {}
  })

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(metricsData))
  }, [metricsData])

  const sortedEntries = Object.entries(metricsData).sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())

  const labels = sortedEntries.map(([timestamp, data]) => {
    const formattedTime = new Date(timestamp).toLocaleTimeString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
    return `${formattedTime}\n(${data.api})`
  })

  const totalData = sortedEntries.map(([, data]) => data.payrollRun + data.upload + data.apply + data.payrollrest)
  const payrollRunData = sortedEntries.map(([, data]) => data.payrollRun)
  const uploadData = sortedEntries.map(([, data]) => data.upload)
  const applyData = sortedEntries.map(([, data]) => data.apply)
  const payrollrestData = sortedEntries.map(([, data]) => data.payrollrest)

  const chartData: ChartData<'line'> = {
    labels,
    datasets: [
      createLineDataset('Total Time', colors.lineChartYellow, totalData, 4, colors.whiteColor),
      createLineDataset('Payroll Run', colors.lineChartPrimary, payrollRunData, 4, colors.whiteColor),
      createLineDataset('Upload', colors.lineChartWarning, uploadData, 4, colors.whiteColor),
      createLineDataset('Apply', colors.extraColor1, applyData, 4, colors.whiteColor),
      createLineDataset('Payroll Rest', colors.extraColor2, payrollrestData, 4, colors.whiteColor)
    ]
  }

  return (
    <Card sx={{ '& .MuiCardHeader-action': { alignSelf: 'center', m: 0 } }}>
      <CardHeader
        title='Stress Test Metrics'
        subheader='Total time vs. individual operations'
        action={<StressTestSettings setMetricsData={setMetricsData} />}
      />
      <CardContent>
        <Line data={chartData} height={400} options={options} />
      </CardContent>
    </Card>
  )
}
