
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import "../../css/Dashboard.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ chartData }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Monthly Expenses by Year",
        font: { size: 22, weight: "bold" },
        color: "#6366f1",
      },
      legend: {
        display: true,
        position: "right",
        labels: {
          color: "#6366f1",
          font: { size: 14, weight: "bold" },
        },
      }
    },
    scales: {
      x: {
        ticks: { color: "#6366f1", font: { size: 14, weight: "bold" } },
        grid: { color: "#e0e7ff" },
      },
      y: {
        title: { display: true, text: "Total Expense" },
        beginAtZero: false,
        ticks: { color: "#6366f1", font: { size: 14, weight: "bold" } },
        grid: { color: "#e0e7ff" },
      },
    },
  };

  // Defensive: fallback to empty chart if no data
  const safeChartData = chartData && chartData.labels ? chartData : { labels: [], datasets: [] };

  return (
    <div className="chart-container" style={{ height: "350px", width: "70vw" }}>
      <Line data={safeChartData} options={options} />
    </div>
  );
};

export default LineChart;
