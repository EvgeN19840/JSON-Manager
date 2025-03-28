/* eslint-disable @typescript-eslint/no-unused-vars */
import 'chart.js';

declare module 'chart.js' {
  interface ChartDatasetProperties<TType extends keyof ChartTypeRegistry, TData> {
    comments?: string[];
    ids?: number[],
    dataType?: string,
    workers?: number[],
    passedTotal?: string[]
  }
}