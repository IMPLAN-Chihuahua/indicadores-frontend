import React, { useState, useEffect } from 'react'
import './featured.css'
import { Box, Grid, Typography } from '@mui/material';
import { getUserStats } from '../../../../../services/userService';
import { useAuth } from '../../../../../contexts/AuthContext';
import { InsertChart, FaceSharp } from '@material-ui/icons';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';

import Wave from 'react-wavify'

const handleResponse = ({ indicadoresCount, usuarios, modulosCount }) => {
  let pie = [];
  pie.push(
    {
      id: '1',
      title: 'Temas de interés',
      enable: modulosCount[0].modulos,
      disable: modulosCount[0].modulosInactivos,
      color: '#011638',
      icon: <StackedLineChartIcon className="featured-icon" />
    },
    {
      id: '2',
      title: 'Indicadores',
      enable: indicadoresCount[0].indicadoresAsignados,
      disable: indicadoresCount[0].indicadores,
      color: '#2E294E',
      icon: <InsertChart className="featured-icon" />,
    },
    {
      id: '3',
      title: 'Usuarios',
      enable: usuarios[0].usuarios,
      disable: usuarios[0].usuariosInactivos,
      color: '#37315E',
      icon: <FaceRetouchingNaturalIcon className="featured-icon" />,
    }
  )
  return pie;
}

export const Featured = () => {
  const [stats, setStats] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getUserStats(user.id)
      .then((res) => {
        setStats(handleResponse(res.data));
      })
      .catch((err) => {
        setStats([]);
      });

  }, [])

  const pieChart = [
    {
      id: '1',
      title: 'TEMAS DE INTERÉS',
      enable: 1,
      disable: 2,
    },
    {
      id: '2',
      title: 'INDICADORES',
      enable: 42,
      disable: 5,
    },
    {
      id: '3',
      title: 'USUARIOS',
      enable: 10,
      disable: 2,
    },
  ];

  return (
    <>
      <Box className='margin-top-home'>
        <Box className='featured-title'>
          Recursos disponibles
          <hr></hr>
        </Box>
        <Grid container spacing={2} className="featured-center">
          {

            stats.map(({ id, title, enable, disable, color, icon }) => {
              return (
                <Grid item xs={12} md={3} key={id}>
                  <Box className='featured-item test'>
                    {/* <span className='featured-title'>{title}</span> */}
                    <Box className="featured-item-values featured-item-values-top">
                      <Typography align="left" variant="subtitle2" className="featured-subtitle">{title}</Typography>
                      <div className="featured-circle-icon" style={{ backgroundColor: color }}>
                        {icon}
                      </div>
                    </Box>
                    <Wave mask="url(#mask)" fill="#1277b0" className='chost'
                      options={{
                        height: 120,
                      }}
                    >
                      <defs>
                        <linearGradient id="gradient" gradientTransform="rotate(90)">
                          <stop offset="0" stopColor="white" />
                          <stop offset="0.5" stopColor="black" />
                        </linearGradient>
                        <mask id="mask">
                          <rect x="0" y="0" width="2000" height="700" fill="url(#gradient)" />
                        </mask>
                      </defs>
                    </Wave>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='chost'>
                      <path fill="#000b76" fill-opacity="0.2" d="M0,32L26.7,80C53.3,128,107,224,160,272C213.3,320,267,320,320,304C373.3,288,427,256,480,250.7C533.3,245,587,267,640,261.3C693.3,256,747,224,800,197.3C853.3,171,907,149,960,149.3C1013.3,149,1067,171,1120,165.3C1173.3,160,1227,128,1280,106.7C1333.3,85,1387,75,1413,69.3L1440,64L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"></path>
                    </svg> */}
                    <Box className="featured-item-values featured-item-values-sub">
                      <div>
                        <Typography align="left" variant="h4" className="featured-value">
                          {enable}
                        </Typography>
                      </div>
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
