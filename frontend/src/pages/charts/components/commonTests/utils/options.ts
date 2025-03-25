import { theme } from "@/customTheme"
import { ChartOptions } from "chart.js"

export const options: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: { color: theme.palette.text.disabled },
      grid: {
        borderColor: theme.palette.divider,
        drawBorder: false,
        color: theme.palette.divider
      }
    },
    y: {
      min: 0,
      afterDataLimits(scale) {
        if (scale.max === 0) {
          scale.max = 40
        } else {
          scale.max = Math.ceil(scale.max * 1.1)
        }
      },
      ticks: { color: theme.palette.text.disabled },
      grid: {
        borderColor: theme.palette.divider,
        drawBorder: false,
        color: theme.palette.divider
      }
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
}