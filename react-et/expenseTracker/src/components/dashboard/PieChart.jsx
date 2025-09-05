import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


const PieChart = ({ chartData }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Expense Distribution',
        font: { size: 22, weight: 'bold' },
        color: '#6366f1',
      },
      legend: {
        display: false,
        position: 'right',
        labels: {
          color: '#6366f1',
          font: { size: 14, weight: 'bold' },
          generateLabels: (chart) => {
            const data = chart.data;
            if (data.labels && chart.data.names) {
              return data.labels.map((emoji, i) => ({
                text: `${emoji} ${chart.data.names[i]}`,
                fillStyle: data.datasets[0].backgroundColor[i],
                strokeStyle: data.datasets[0].borderColor,
                lineWidth: data.datasets[0].borderWidth,
                hidden: false,
                index: i,
              }));
            }
            return ChartJS.defaults.plugins.legend.labels.generateLabels(chart);
          },
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          title: (tooltipItems) => {
            const idx = tooltipItems[0].dataIndex;
            return chartData && chartData.names ? chartData.names[idx] : '';
          },
        },
      },
    },
  };
  return (
    <div className="chart-container" style={{ height: '95%', width: '95%', margin: 'auto', minHeight: '350px' }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default PieChart;