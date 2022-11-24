import React, { useState, useEffect } from 'react'
import './featured.css'
import { Box, Grid, Paper, Skeleton, Typography } from '@mui/material';
import { getUserStats } from '../../../../../services/userService';
import { useAuth } from '../../../../../contexts/AuthContext';
import { InsertChart } from '@material-ui/icons';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';

import Wave from 'react-wavify'
import useIsMounted from '../../../../../hooks/useIsMounted';

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
      title: 'Indicadores asignados',
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
  const skeletonArray = [1, 2, 3];
  const isMounted = useIsMounted();

  useEffect(() => {
    getUserStats(user.id)
      .then((res) => {
        if(isMounted()) {
          setStats(handleResponse(res.data));
        }
      })
      .catch((err) => {
        setStats([]);
      });
  }, [isMounted])

  return (
    <Box>
      <Grid container spacing={3}>
        {
          stats.length > 0 ?
            stats.map(({ id, title, enable, color, icon }) => {
              return (
                <Grid item xs={12} md={4} key={id}>
                  <Paper elevation={1} sx={{height: '120px', position: 'relative'}}>
                    <Box className="featured-item-values featured-item-values-top">
                      <Typography align="left" variant="subtitle1" p={1}>{title}</Typography>
                      <div className="featured-circle-icon" style={{ backgroundColor: color }}>
                        {icon}
                      </div>
                    </Box>
                    <Wave mask="url(#mask)" fill="var(--blue-300)" className='chost'
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
                    <Box className="featured-item-values featured-item-values-sub">
                      <div>
                        <Typography align="left" variant="h4" className="featured-value" pl={2}>
                          {enable}
                        </Typography>
                      </div>
                    </Box>

                  </Paper>
                </Grid>
              )
            })
            :
            <>
              {
                skeletonArray.map((item) => {
                  return (
                    <Grid item xs={12} md={3} key={item}>
                      <Box className='featured-item test'>
                        <Box className="featured-item-values featured-item-values-top">
                          <div style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'flex-end', marginBottom: '22px' }}>
                            <Skeleton variant="circular" width={40} height={40} className="featured-icon" />
                          </div>
                        </Box>

                        <Skeleton variant="rectangular" width={'100%'} height={50} />

                      </Box>
                    </Grid>
                  )
                })
              }
            </>
        }
      </Grid>
    </Box>
  )
}
