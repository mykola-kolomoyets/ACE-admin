import { useRef } from 'react';

import { externalTooltipHandler } from './line-chart.utils';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TooltipItem,
  ChartData
} from 'chart.js';
import { createSeparatorsNumber } from '../../utils/fn';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export type useLineChartProps = {
  chartData?: ChartData<'line', number[], string>;
  tooltipsLabels?: string[];
};

export const useLineChart = ({
  chartData,
  tooltipsLabels
}: useLineChartProps) => {
  const chartRef = useRef(null);

  /**
   * Creating the label numbers data for tooltip
   */
  const labels = (tooltipItem: TooltipItem<'line'>) => {
    const { dataIndex } = tooltipItem;

    if (chartData?.datasets?.length === 1) {
      const currentAmount = chartData?.datasets[0].data[dataIndex];

      return [currentAmount.toString()];
    }

    return chartData?.datasets.map((set) => set.data[dataIndex].toString());
  };

  /**
   * Creating the flat list of dataset array
   */
  const yAxisDataset =
    (chartData?.datasets?.length === 1
      ? [...(chartData?.datasets[0].data || [])]
      : chartData?.datasets.map((set) => set.data).flat()) || [];

  /**
   * setting the parameters of chart displaying
   */
  const options = {
    interaction: {
      mode: 'index' as any,
      intersect: false
    },
    scales: {
      y: {
        beginAtZero: true,
        type: 'linear' as any,
        position: 'left' as any,
        max: Math.max(...yAxisDataset) + 2000,
        ticks: {
          stepSize: (Math.ceil(Math.max(...yAxisDataset) / 1000) * 1000) / 4,
          padding: 10,
          callback: createSeparatorsNumber as any
        }
      },
      x: {
        position: 'right' as any,
        grid: { drawOnChartArea: false }
      }
    },
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        titleFont: { weight: 'bold' },
        enabled: false,
        position: 'nearest' as any,
        model: 'label' as any,
        callbacks: {
          // eslint-disable-next-line no-unused-vars
          beforeBody: (_: TooltipItem<'line'>[]) => tooltipsLabels as string[],
          label: (tooltipItem: TooltipItem<'line'>) =>
            labels(tooltipItem) as string[]
        },
        external: externalTooltipHandler
      }
    }
  };

  return { chartRef, options, chartData };
};
