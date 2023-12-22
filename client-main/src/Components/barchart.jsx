import React, { useContext } from 'react';
import {Bar} from "react-chartjs-2"
import { Chart, BarElement, BarController, CategoryScale,LinearScale, Filler, Legend, Title, Tooltip } from 'chart.js';
import { context } from '../contextAPI';
import randomColor from 'randomcolor';

Chart.register(BarElement, BarController, CategoryScale,LinearScale, Filler, Legend, Title, Tooltip);

const BarChartComponent = () => {
    const {data} = useContext(context)
    const bardata = {
      labels: ['0-100', '101-200', '201-300', '301-400', '401-500', '501-600', '601-700', '701-800', '801-900', '901-above'],
      datasets: [{
        label: "No Of Products",
        data: Object.values(data.barChartData),
        backgroundColor: randomColor({ count: 10 }),
        borderWidth: 1,
      }]
    };
  
    const options = {
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          max: 10, 
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Value Distribution',
        },
      },
    };
  
    return (
      <div className='barChart'>
        <Bar data={bardata} options={options} />
      </div>
    );
  };

export default BarChartComponent;
