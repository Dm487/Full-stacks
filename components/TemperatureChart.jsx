import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TemperatureChart = ({ dailyData }) => {
  if (!dailyData || dailyData.length === 0) return null;

  const labels = dailyData.map((day) => {
    const date = new Date(day.date);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  });

  const temps = dailyData.map((day) => day.temp);

  const data = {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temps,
        borderColor: 'rgb(26, 115, 232)',
        backgroundColor: 'rgba(26, 115, 232, 0.2)',
        tension: 0.3,
        fill: true,
        pointBackgroundColor: 'rgb(26, 115, 232)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Temperature Trend (Daily Average)',
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Day',
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={data} options={options} />
    </div>
  );
};

export default TemperatureChart;