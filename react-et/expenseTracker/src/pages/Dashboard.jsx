import "../css/Dashboard.css";
import axios from "axios";
import { useGlobalStatus } from "../components/context/GlobalStatusContext";
import { toast } from "react-toastify";
import BarChart from "../components/dashboard/BarChart";
import PieChart from "../components/dashboard/PieChart";
import LineChart from "../components/dashboard/LineChart";
import { useEffect, useState } from "react";

function Dashboard() {
  const { isLoading, setIsLoading } = useGlobalStatus();
  function getRandomColor() {
    const hue = Math.floor(Math.random() * 720);
    return `hsl(${hue}, 80%, 80%)`;
  }
  const [barCharData, setBarCharData] = useState({
    labels: [],
    datasets: [
      {
        labels: "",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });
  const [pieCharData, setPieCharData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });
  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
    ],
  });
  const formatChartData = (reqData) => {
    return {
      labels: reqData.map((data) => data.emoji), // Only emoji for x-axis
      datasets: [
        {
          label: "Budget Utilization",
          data: reqData.map((data) => (data.totalExpense * 100) / data.budget),
          backgroundColor: "rgba(99, 102, 241, 0.7)", // theme color
          borderColor: "#6366f1",
          borderWidth: 1,
        },
      ],
      // Custom property for tooltips
      names: reqData.map((data) => data.name),
    };
  };
  const formatPieChartData = (reqData) => {
    return {
      labels: reqData.map((data) => data.emoji),
      datasets: [
        {
          data: reqData.map((data) => data.totalExpense),
          backgroundColor: reqData.map(() => getRandomColor()),
          borderColor: "#e0e7ff",
          borderWidth: 2,
        },
      ],
      names: reqData.map((data) => data.name),
    };
  };
  const formatLineChartData = (reqData) => {
    let yearlyData = {};
    reqData.forEach((item) => {
      yearlyData[item.year] = {
        label: [...(yearlyData[item.year]?.label || []), item.month],
        data: [...(yearlyData[item.year]?.data || []), item.totalExpense],
      };
    });

    const result = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [],
    };

    Object.keys(yearlyData).forEach((key) => {
      result.datasets.push({
        label: key,
        data: yearlyData[key].data,
        borderColor: getRandomColor(),
        fill: false,
      });
    });

    return result;
  };
  const fetchCategoryUtilization = async () => {
    setIsLoading(true);
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    try {
      const response = await axios.get(
        `http://localhost:8080/api/dashboard/category-utilization?year=${year}&month=${month}`
      );
      setBarCharData(formatChartData(response.data));
      setPieCharData(formatPieChartData(response.data));
    } catch (error) {
      toast.error("Error fetching category utilization.");
    } finally {
      setIsLoading(false);
    }
  };
  const fetchYearlyMonthlyTrend = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/dashboard/monthly-expense-trend`);
      setLineChartData(formatLineChartData(response.data));
    } catch (error) {
      toast.error("Error fetching yearly monthly trends.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryUtilization();
    fetchYearlyMonthlyTrend();
  }, []);

  return (
    <div className="dashboard-container">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="dashboard-row">
            <div className="dashboard-box">
              <PieChart chartData={pieCharData} />
            </div>
            <div className="dashboard-box">
              <div className="box-chart">
                <BarChart chartData={barCharData} />
              </div>
            </div>
          </div>
          <div className="dashboard-row">
            <div className="dashboard-box">
              <div className="box-chart">
                <LineChart chartData={lineChartData}/>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
