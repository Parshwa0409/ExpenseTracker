import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const BarChart = (props) => {

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: true, text: 'Budget Utilization (%)', font: { size: 22, weight: 'bold' }, color: '#6366f1' },
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          title: (tooltipItems) => {
            // Show name in tooltip title
            const idx = tooltipItems[0].dataIndex;
            return props.chartData && props.chartData.names ? props.chartData.names[idx] : '';
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { color: '#6366f1', font: { size: 14, weight: 'bold' } },
        grid: { color: '#e0e7ff' },
      },
      y: {
        beginAtZero: true,
        ticks: { color: '#6366f1', font: { size: 14, weight: 'bold' } },
        grid: { color: '#e0e7ff' },
      },
    },
  };

  // Defensive: fallback to empty chart if no data
  const safeChartData = props.chartData && props.chartData.labels ? props.chartData : { labels: [], datasets: [] };

  return (
    <div className="chart-container" style={{ height: '300px', width: '600px' }}>
      <Bar data={safeChartData} options={options} />
    </div>
  );
};

export default BarChart;