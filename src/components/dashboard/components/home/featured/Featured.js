import React from 'react'
import './featured.css'
import {PieChart} from 'react-minimal-pie-chart'
import { Box, Grid } from '@mui/material';

const pieChart = [
  {
    id:'1',
    title: 'Modulos',
    enable: 20,
    disable: 1,
  },
  {
    id:'2',
    title: 'Indicadores',
    enable: 42,
    disable: 5,
  },
  {
    id:'3',
    title: 'Usuarios',
    enable: 10,
    disable: 2,
  },
];

export const Featured = () => {
  return (
    <>
    <Box className='margin-top-home'>
      <Box className='featured-title'>
        Recursos disponibles
        <hr></hr>
      </Box>
      <Grid container spacing={2}>
      {
        pieChart.map( ({id,title,enable,disable}) => {
          return(
            <Grid item xs={12} md={4} key={id}>
          <Box className='featured-item'>
          <span className='featured-title'>{title}</span>
          <Box className='feature-container'>
          <Box className='featured-items'>
          <Box className='featured-pie-chart'>
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
            </Box>
          </Box>
          </Box>
          <Box className='featured-information' >
            {enable}/{disable + enable}
          </Box>
          </Box>
        </Grid>
          )
        })
      }
    </Grid>
      </Box>
    

    </>
  )
}
