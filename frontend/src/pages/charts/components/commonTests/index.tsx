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
import { GroupedBarChart, CustomSelect } from './components'
import { optionsSingleTest } from './utils/optionsSingleTest'

// Types
import { ITest } from '@/types/tests'

export const CommonTests = () => {
  const { load, data, testsNames, envs, getData, addCommentToTest } = useTests()

  const [selectedTest, setSelectedTest] = useState<string>('AllTest')
  const [selectedEnv, setSelectedEnv] = useState<string>('AllTest')

  const [customChartData, setCustomChartData] = useState<ChartData<'line'> | null>(null)
  const [customLoading, setCustomLoading] = useState<boolean>(false)

  useEffect(() => {
    getData({ env: selectedEnv })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEnv])

  useEffect(() => {
    const fetchCustomData = async () => {
      if (selectedTest !== 'AllTest') {
        setCustomLoading(true)
        try {
          const customData = await getTest(selectedTest, selectedEnv)
          const body = customData.body as ITest[]
          const newLabels = body.map(item => DateFormat(item.date))
          const newChartData: ChartData<'line'> = {
            labels: newLabels,
            datasets: [
              createLineDataset(
                'Custom Data',
                colors.lineChartYellow,
                body.map(item => item.time),
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
  }, [selectedTest, selectedEnv])

  const handleTestSelectChange = (value: string) => {
    setSelectedTest(value)
  }

  const handleEnvChange = (value: string) => {
    setSelectedEnv(value)
  }

  return (
    <Card>
      <CardHeader
        title={`${selectedTest === 'AllTest' ? 'Commons Test Metrics' : `${selectedTest} Test Metrics`} `}
        action={
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <CustomSelect label='Tests' names={testsNames} selected={selectedTest} onChange={handleTestSelectChange} />
            <CustomSelect label='Envs' names={envs} selected={selectedEnv} onChange={handleEnvChange} />
          </Box>
        }
      />
      <CardContent>
        {selectedTest === 'AllTest' ? (
          load ? (
            <Box sx={{ height: '400px' }}>Loading</Box>
          ) : (
            <GroupedBarChart addCommentToTest={commentData => addCommentToTest(commentData, selectedEnv)} data={data} />
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
