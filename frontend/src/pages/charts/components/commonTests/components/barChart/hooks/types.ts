import { ChartDataset } from 'chart.js'

export interface CustomBarDataset extends ChartDataset<'bar', number[]> {
  comments: string[]
}