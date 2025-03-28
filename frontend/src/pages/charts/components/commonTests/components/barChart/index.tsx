// GroupedBarChart.tsx
import { FC, MouseEvent, useRef, useState } from 'react'
import { Chart, getElementAtEvent } from 'react-chartjs-2'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'

import { ChartModal } from './components'
import { IAllTimeTestClient } from '@/types/tests'
import { ChartBaseOptions } from './constants/chartBaseOptions'

// ** Hooks
import { useChartData } from './hooks/useChartData'
import { Box } from '@mui/material'

// ** Types
import { ICharatModalData } from './types'
import { IAddComment } from '@/pages/charts/service/types'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

interface IGroupedBarChartProps {
  data: IAllTimeTestClient[]
  addCommentToTest: (value: IAddComment) => Promise<void>
}

export const GroupedBarChart: FC<IGroupedBarChartProps> = ({ data, addCommentToTest }) => {
  const chartRef = useRef<ChartJS<'bar', number[], string> | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [modalData, setModalData] = useState<null | ICharatModalData>(null)

  const chartData = useChartData(data)

  const handleClick = (event: MouseEvent<HTMLCanvasElement>) => {
    const chart = chartRef.current
    if (!chart) return
    const element = getElementAtEvent(chart, event)[0]
    if (!element) return
    const { datasetIndex, index } = element
    const dataset = chartData.datasets[datasetIndex]
    const value = dataset.data[index]
    const label = dataset.label
    const date = chartData.labels?.[index]
    const comment = dataset.comments ? dataset.comments[index] : ''
    const id = dataset.ids ? dataset.ids[index] : 0
    const type = dataset.dataType ? dataset.dataType : ''

    if (typeof date !== 'string') return

    setModalData({
      label: label ?? '',
      value: typeof value === 'number' ? value.toFixed(2) : value,
      date: date ?? '',
      comment: comment,
      id: id,
      type
    })
    setOpen(true)
  }

  return (
    <Box style={{ height: 400, width: '100%' }}>
      <Chart onClick={handleClick} ref={chartRef} type='bar' data={chartData} options={{ ...ChartBaseOptions }} />
      <ChartModal
        addCommentToTest={addCommentToTest}
        open={open}
        setModalData={setModalData}
        data={modalData}
        onClose={() => setOpen(false)}
      />
    </Box>
  )
}
