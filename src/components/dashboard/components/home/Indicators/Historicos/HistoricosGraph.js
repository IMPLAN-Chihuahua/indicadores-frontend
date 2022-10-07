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
import { orderHistoricos } from "../../../../../../utils/historicoValidator";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const HistoricosGraph = ({ historicosData, ultimoValor, ultimaFecha }) => {
  const actualDate = new Date(ultimaFecha).getFullYear();

  const orderedHistoricos = orderHistoricos(historicosData);

  const labels = orderedHistoricos.map(historico => {
    return historico.anio;
  });

  labels.push(actualDate);
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
        data: orderedHistoricos.map(({ valor }) => valor),
      },
    ],
  };

  data.datasets[0].data.push(ultimoValor);

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