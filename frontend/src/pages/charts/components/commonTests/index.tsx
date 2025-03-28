// src/CommonTests.tsx
import { useState, useEffect } from 'react'
import { Box, Card, CardHeader, CardContent } from '@mui/material'
import { Line } from 'react-chartjs-2'
import { ChartData } from 'chart.js'

// Local Utilities & Constants
import { createLineDataset } from './utils/createLineDataset'
import { colors } from './constants/color'
import { DateFormat } from './utils/date'

// Hooks
import useTests from './hooks/useTests'

// Components
import { getTest } from '../../service'
import { GroupedBarChart, TestSelect } from './components'
import { optionsSingleTest } from './utils/optionsSingleTest'

export const CommonTests = () => {
  const { load, data, testsNames, addCommentToTest } = useTests()

  const [selectedTest, setSelectedTest] = useState<string>('AllTest')
  const [customChartData, setCustomChartData] = useState<ChartData<'line'> | null>(null)
  const [customLoading, setCustomLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchCustomData = async () => {
      if (selectedTest !== 'AllTest') {
        setCustomLoading(true)
        try {
          const customData = await getTest(selectedTest)
          const newLabels = customData.body.map(item => DateFormat(item.date))
          const newChartData: ChartData<'line'> = {
            labels: newLabels,
            datasets: [
              createLineDataset(
                'Custom Data',
                colors.lineChartYellow,
                customData.body.map(item => item.time),
                4,
                colors.whiteColor
              )
            ]
          }
          setCustomChartData(newChartData)
        } catch (error) {
          console.error('Error fetching custom data: ', error)
        } finally {
          setCustomLoading(false)
        }
      } else {
        setCustomChartData(null)
      }
    }
    fetchCustomData()
  }, [selectedTest])

  const handleTestSelectChange = (value: string) => {
    setSelectedTest(value)
  }

  return (
    <Card sx={{ '& .MuiCardHeader-action': { alignSelf: 'center', m: 0 } }}>
      <CardHeader
        title={`${selectedTest === 'AllTest' ? 'Commons Test Metrics' : `${selectedTest} Test Metrics`} `}
        action={<TestSelect testsNames={testsNames} selectedTest={selectedTest} onChange={handleTestSelectChange} />}
      />
      <CardContent>
        {selectedTest === 'AllTest' ? (
          load ? (
            <Box sx={{ height: '400px' }}>Loading</Box>
          ) : (
            <GroupedBarChart addCommentToTest={addCommentToTest} data={data} />
          )
        ) : customLoading || !customChartData ? (
          <Box sx={{ height: '400px' }}>Loading</Box>
        ) : (
          <Line data={customChartData} height={400} options={optionsSingleTest} />
        )}
      </CardContent>
    </Card>
  )
}
