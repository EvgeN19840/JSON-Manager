import { useMemo } from 'react'
import { Chart } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js'
import distinctColors from 'distinct-colors'

import { IAllTimeTestClient } from '@/types/tests'
import { DateFormat } from '../../utils/date'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const options: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      stacked: true
    },
    y: {
      stacked: true,
      beginAtZero: true
    }
  }
}

export const GroupedBarChart = ({ data }: { data: IAllTimeTestClient[] }) => {
  const labels = data.map(item => DateFormat(item.date))

  const allTestNames = Array.from(new Set(data.flatMap(item => item.tests.map(test => test.test_name)))).sort(
    (a, b) => Number(a) - Number(b)
  )

  const colorMap = useMemo(() => {
    const palette = distinctColors({ count: allTestNames.length })
    const map: Record<string, string> = {}
    allTestNames.forEach((name, i) => {
      map[name] = palette[i].hex()
    })
    return map
  }, [allTestNames])

  const calculatedDatasets = allTestNames.map(testName => {
    const values = data.map(item => {
      const match = item.tests.find(test => test.test_name === testName)
      return match ? match.time : 0
    })

    return {
      label: `Test ${testName}`,
      data: values,
      backgroundColor: colorMap[testName],
      stack: 'calculated',
      barThickness: 15
    }
  })

  const actualTotal = data.map(item => item.time)

  const actualDataset = {
    label: 'Actual Total',
    data: actualTotal,
    backgroundColor: '#ff7043',
    stack: 'actual',
    barThickness: 15
  }

  const chartData: ChartData<'bar'> = {
    labels,
    datasets: [...calculatedDatasets, actualDataset]
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Chart type='bar' data={chartData} options={options} />
    </div>
  )
}
