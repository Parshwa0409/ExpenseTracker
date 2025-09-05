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
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [isEmpty, setIsEmpty] = useState(false);

  function getRandomColor() {
    const hue = Math.floor(Math.random() * 720);
    return `hsl(${hue}, 80%, 80%)`;
  }

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

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
    try {
      // Validate required fields
      reqData.forEach((data, index) => {
        if (
          !data.emoji ||
          !data.budget ||
          typeof data.totalExpense !== "number"
        ) {
          console.warn(`Invalid data at index ${index}:`, data);
        }
      });

      // Filter out invalid data
      const validData = reqData.filter(
        (data) =>
          data.emoji &&
          data.budget &&
          typeof data.totalExpense === "number" &&
          data.budget > 0 // Prevent division by zero
      );

      return {
        labels: validData.map((data) => data.emoji),
        datasets: [
          {
            label: "Budget Utilization",
            data: validData.map((data) => {
              const percentage = (data.totalExpense * 100) / data.budget;
              return Math.min(percentage, 100); // Cap at 100% for better visualization
            }),
            backgroundColor: "rgba(99, 102, 241, 0.7)",
            borderColor: "#6366f1",
            borderWidth: 1,
          },
        ],
        names: validData.map((data) => data.name),
      };
    } catch (error) {
      console.error("Error formatting chart data:", error);
      return {
        labels: [],
        datasets: [
          {
            label: "Budget Utilization",
            data: [],
            backgroundColor: "rgba(99, 102, 241, 0.7)",
            borderColor: "#6366f1",
            borderWidth: 1,
          },
        ],
        names: [],
      };
    }
  };
  const formatPieChartData = (reqData) => {
    return {
      labels: reqData.map((data) => data.name),
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
    try {
      const response = await axios.get(
        `http://localhost:8080/api/dashboard/category-utilization?year=${selectedYear}&month=${selectedMonth}`
      );

      if (response.data.length === 0) {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
        setBarCharData(formatChartData(response.data));
        setPieCharData(formatPieChartData(response.data));
      }
    } catch (error) {
      toast.error("Error fetching category utilization.");
    } finally {
      setIsLoading(false);
    }
  };
  const fetchYearlyMonthlyTrend = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/dashboard/monthly-expense-trend`
      );
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
  }, [selectedYear, selectedMonth]);

  return (
    <div className="dashboard-container">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="dashboard-row filter-section">
            <div className="dashboard-input-box">
              <label htmlFor="year" className="form-label">
                Choose Year:{" "}
              </label>
              <select
                id="year"
                className="form-input form-select"
                value={selectedYear}
                onChange={handleYearChange}
              >
                {[...Array(5)].map((_, i) => (
                  <option key={i} value={new Date().getFullYear() - i}>
                    {new Date().getFullYear() - i}
                  </option>
                ))}
              </select>
            </div>
            <div className="dashboard-input-box">
              <label htmlFor="month" className="form-label">
                Choose Month:{" "}
              </label>
              <select
                id="month"
                className="form-input form-select"
                value={selectedMonth}
                onChange={handleMonthChange}
              >
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month, index) => (
                  <option key={month} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {isEmpty ? (
            <div className="dashboard-row">
              <div className="dashboard-box dashboard-message">
                <div>
                  No data available for{" "}
                  <strong>
                    {selectedMonth}/{selectedYear}
                  </strong>
                  .<br />
                  Please select a different month or year.
                </div>
              </div>
            </div>
          ) : (
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
          )}
          <div className="dashboard-row">
            <div className="dashboard-box">
              <div className="box-chart">
                <LineChart chartData={lineChartData} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
