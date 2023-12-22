import React, { useContext } from "react";
import { Pie } from "react-chartjs-2";
import randomColor from "randomcolor";
import {
  Chart,
  ArcElement,
  PieController,
  CategoryScale,
  Filler,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { context } from "../contextAPI";

Chart.register(
  ArcElement,
  PieController,
  CategoryScale,
  Filler,
  Legend,
  Title,
  Tooltip
);

const PiechartComponent = () => {
  const { data } = useContext(context);

  const chartData = {
    labels: Object.keys(data.pieChartData),
    datasets: [
      {
        data: Object.values(data.pieChartData),
        backgroundColor: randomColor({
          count: Object.keys(data.pieChartData).length,
        }),
        hoverBackgroundColor: randomColor({
          count: Object.keys(data.pieChartData).length,
        }),
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: true,
    responsive: true,
  };

  return (
    <div className="pieChart">
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default PiechartComponent;
