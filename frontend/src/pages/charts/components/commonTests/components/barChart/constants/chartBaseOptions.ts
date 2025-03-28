import { ChartOptions } from "chart.js";

export const ChartBaseOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: (context) => {
          const datasetLabel = context.dataset.label || '';
          const value = context.parsed.y;
          let comment = context.dataset.comments ? context.dataset.comments[context.dataIndex] : '';
          const workers = context.dataset.workers ? context.dataset.workers[context.dataIndex] : '';
          const statistic = context.dataset.passedTotal ? context.dataset.passedTotal[context.dataIndex] : '';

          const maxLength = 20;
          if (comment && comment.length > maxLength) {
            comment = comment.slice(0, maxLength).trim() + '...';
          }

          return [
            datasetLabel,
            `Time: ${value} sec`,
            ...(comment ? [`Comment: ${comment}`] : []),
            ...(workers ? [`Workers: ${workers}`] : []),
            ...(statistic ? [`Passed/Total: ${statistic}`] : []),
          ];
        }
      }
    }
  },
  scales: {
    x: {
      stacked: true
    },
    y: {
      stacked: true,
      beginAtZero: true,
      title: {
        display: true,
        text: 'seconds'
      }
    }
  }
}