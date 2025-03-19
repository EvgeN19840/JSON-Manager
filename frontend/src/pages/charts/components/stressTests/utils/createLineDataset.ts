export const createLineDataset = (
  label: string,
  color: string,
  data: number[],
  pointRadius: number,
  white: string
) => ({
  fill: false,
  tension: 0.5,
  pointRadius,
  label,
  pointHoverRadius: 5,
  pointStyle: 'circle',
  borderColor: color,
  backgroundColor: color,
  pointHoverBorderWidth: 5,
  pointHoverBorderColor: white,
  pointBorderColor: 'transparent',
  pointHoverBackgroundColor: color,
  data
})

