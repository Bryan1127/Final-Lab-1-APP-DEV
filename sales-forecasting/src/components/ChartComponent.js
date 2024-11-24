import React from "react";
import { Line } from "react-chartjs-2";

const ChartComponent = ({ data, predictions }) => {
  if (!data.length || !predictions.length) return <p>Upload data to visualize</p>;

  const labels = data.map((item) => item.sales_date);
  const actualSales = data.map((item) => Number(item.quantity_sold));
  const forecastSales = predictions;

  const chartData = {
    labels,
    datasets: [
      {
        label: "Actual Sales",
        data: actualSales,
        borderColor: "blue",
        fill: false,
      },
      {
        label: "Forecast Sales",
        data: forecastSales,
        borderColor: "red",
        fill: false,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default ChartComponent;
