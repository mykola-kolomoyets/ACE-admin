import { Line } from 'react-chartjs-2';

import { hoc } from '../../utils/hoc';

import { useLineChart } from './line-chart.hook';

import './line-chart.scss';

const LineChart = hoc(useLineChart, ({ chartRef, options, chartData }) => (
  <Line ref={chartRef} options={options} data={chartData} />
));

export { LineChart };
