import React from "react";
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


export const HistoricosGraph = ({ historicosData }) => {
  const labels = historicosData.map(historico => {
    const localDate = new Date(historico.fechaIngreso);
    return localDate.toLocaleString('es-ES', { month: 'long' })
  });
  //const labels = historicosData.map(({ anio }) => anio);
  // const labels = [123, 321, 456, 123, 4568]
  const data = {
    labels,
    datasets: [
      {
        label: 'Valores históricos',
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 10,
        pointRadius: 10,
        pointHitRadius: 10,
        data: historicosData.map(({ valor }) => valor),
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
        text: 'Nombre del indicador',
      },
      label: {
        display: false,
      },
    },
  };
  return <Line options={{ animation: false, animations: false, label: { display: false } }} data={data} />;
}