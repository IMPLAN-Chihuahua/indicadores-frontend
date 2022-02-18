import React from 'react'
import './featured.css'
import {PieChart} from 'react-minimal-pie-chart'
import { Box, Grid } from '@mui/material';

const pieChart = [
  {
    id:'1',
    title: 'Modulos',
    enable: 60,
    disable: 9,
  },
  {
    id:'2',
    title: 'Indicadores',
    enable: 4,
    disable: 3,
  },
];

export const Featured = () => {
  return (
    <>
      <div className='featured-title'>
        Recursos disponibles
        <hr></hr>
      </div>
      <Grid container spacing={2}>
      {
        pieChart.map( ({id,title,enable,disable}) => {
          return(
            <Grid item xs={12} md={6} key={id}>
          <div className='featured-item'>
          <span className='featured-title'>{title}</span>
          <div className='feature-container'>
          <div className='featured-items'>
          <div className='featured-pie-chart'>
            <PieChart
            animate
            animationDuration={500}
            animationEasing = 'ease-out'
            data={[
              {title: 'Disponibles', value: parseInt(`${enable}`), color: '#0275d8'},
              {title: 'No disponibles', value: parseInt(`${disable}`), color: '#93A8DE'}
          ]}
          lengthAngle={360}
          lineWidth={40}
          paddingAngle={0}
          startAngle={0}
          radius={50}
          labelPosition={50}
          />
            </div>
          </div>
          </div>
          <div className='featured-information' >
            {enable}/{disable + enable}
          </div>
          </div>
        </Grid>
          )
        })
      }
    </Grid>
    

    </>
  )
}
