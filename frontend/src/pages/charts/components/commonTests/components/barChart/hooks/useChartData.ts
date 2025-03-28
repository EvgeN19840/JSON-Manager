import { useMemo } from 'react'
import { ChartData } from 'chart.js'
import { IAllTimeTestClient } from '@/types/tests'
import { CustomBarDataset } from './types'
import { DateFormat } from '../../../utils/date'

export const useChartData = (data: IAllTimeTestClient[]): ChartData<'bar', number[]> => {
  const labels = useMemo(() => data.map(item => DateFormat(item.date)), [data])

  const allTestNames = useMemo(() => {
    const testTimeMap = new Map<string, number>()
    data.forEach(item => {
      item.tests.forEach(test => {
        const prevTime = testTimeMap.get(test.test_name) || 0
        testTimeMap.set(test.test_name, prevTime + test.time)
      })
    })

    return Array.from(testTimeMap.entries())
      .sort(([, timeA], [, timeB]) => timeB - timeA)
      .map(([testName]) => testName)
  }, [data])

  const calculatedDatasets: CustomBarDataset[] = useMemo(() => {
    return allTestNames.map(testName => {
      const values: number[] = []
      const comments: string[] = []
      const ids: number[] = []
      const bgColors: string[] = []

      data.forEach(item => {
        const match = item.tests.find(test => test.test_name === testName)
        values.push(match?.time ?? 0)
        comments.push(match?.comment || '')
        ids.push(match?.id ?? 0)

        if (match?.status === 'skipped') bgColors.push('grey')
        else if (match?.status === 'passed') bgColors.push('#5ac25d')
        else if (match) bgColors.push('#e53935')
        else bgColors.push('transparent')
      })

      return {
        label: `Test ${testName}`,
        data: values,
        comments,
        ids,
        backgroundColor: bgColors,
        borderColor: '#fff',
        borderWidth: 1,
        stack: 'calculated',
        barThickness: 15,
        dataType: 'common_test'
      }
    })
  }, [allTestNames, data])

  const passedTotal = useMemo(() => {
    return data.map(item => {
      const total = item.tests.length
      const passed = item.tests.filter(test => test.status === 'passed').length
      return `${passed}/${total}`
    })
  }, [data])

  const actualDataset: CustomBarDataset = useMemo(() => ({
    label: 'Total tests',
    data: data.map(item => item.time),
    comments: data.map(item => item.comment || ''),
    ids: data.map(item => item.id),
    backgroundColor: data.map(item =>
      item.status === 'failed' ? '#e53935' : '#43a047'
    ),
    stack: 'actual',
    dataType: 'main_test',
    barThickness: 15,
    workers: data.map(item => item.workers),
    passedTotal
  }), [data, passedTotal])

  const chartData: ChartData<'bar', number[]> = useMemo(() => ({
    labels,
    datasets: [...calculatedDatasets, actualDataset]
  }), [labels, calculatedDatasets, actualDataset])

  return chartData
}