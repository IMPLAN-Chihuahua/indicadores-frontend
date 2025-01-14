import { Avatar, Box, CircularProgress, Grid, Paper, Skeleton, Stack, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import useIsMounted from '../../../../../hooks/useIsMounted'
import { getlatestIndicators, getLatestTemas, getlatestUsers } from '../../../../../services/userService'
import './latestRecords.css'
import useSWR from 'swr'
import { protectedApi } from '../../../../../services'


function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0].toUpperCase()}`,
  };
}

const fetcher = (url) => protectedApi.get(url).then(res => res.data.data)

export const LatestRecords = () => {
  return (
    <Box mt={3}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={5}>
          <Paper variant='outlined' sx={{ p: 2 }}>
            <Typography variant='h6'>Usuarios Recientes</Typography>
            <LatestUsuarios />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={7} className='latest-right-box'>
          <Stack direction='column' spacing={3}>
            <Paper sx={{ p: 2 }} variant='outlined'>
              <Typography variant='h6'>Temas de Interés</Typography>
              <LatestTemas />
            </Paper>

            <Paper sx={{ p: 2 }} variant='outlined'>
              <Typography variant='h6'>Indicadores</Typography>
              <LatestIndicadores />
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}


const LatestUsuarios = () => {
  const skeletonArray = [1, 2, 3, 4, 5];
  const { data: usuarios, loading } = useSWR('/usuarios', fetcher)
  if (loading) {
    return (
      skeletonArray.map((item, i) => (
        <Box key={item}>
          <Box>
            <Box className='latest-all-left'>
              <Skeleton variant="circular" width={45} height={45} />
              <Box className='latest-all-info'>
                <Skeleton variant="text" width={100} height={20} className='latest-all-name' />
              </Box>
            </Box>
            <Box className='latest-status'>
              <Skeleton variant="text" width='100%' height={20} className='latest-status-text' />
            </Box>
          </Box>
        </Box>
      ))
    )
  }
  return (
    <>
      {
        usuarios?.slice((usuarios.length - 7), usuarios.length).reverse().map((user, i) => {
          return (
            <Box key={user.id}>
              <Paper className='latest-all-item' variant='outlined' style={{ borderRadius: '15px' }}>
                <Box className='latest-all-left'>
                  <Box className='latest-picture'>
                    <Box className='latest-picture-item'>
                      <Avatar alt={user.nombres} src={user.urlImagen} sx={{ height: 45, width: 45 }} className="latest-picture-hoverable main-avatar" />
                    </Box>
                  </Box>
                  <Box className='latest-all-info'>
                    <span className='latest-all-name'>{user.nombres}</span>
                  </Box>
                </Box>
                <Box className='latest-status'>
                  <span className={`latest-status-text ${(user.activo ? 'active' : '')}`}>{`${(user.activo ? 'Activo' : 'Inactivo')}`}</span>
                </Box>
              </Paper>
            </Box>
          )
        })
      }
    </>
  );
}


const LatestTemas = () => {
  const { data: temas, loading } = useSWR('/temas', fetcher)
  if (loading) {
    return <CircularProgress />
  }

  return (
    <>
      {
        temas?.slice((temas.length - 3), temas.length).reverse().map((temas, i) => {
          return (
            <Box key={temas.id}>
              <Paper className='latest-all-item' variant='outlined' style={{ borderRadius: '15px' }}>
                <Box className='latest-all-left'>
                  <Box className='latest-picture'>
                    <Box className='latest-picture-item-temas'>
                      <Avatar alt={temas.temaIndicador} src={temas.urlImagen} sx={{ height: 45, width: 45 }} className="latest-picture-hoverable" />
                    </Box>
                  </Box>
                  <Box className='latest-all-info'>
                    <span className='latest-all-name'>{temas.temaIndicador}</span>
                  </Box>
                </Box>
                <Box className='latest-status'>
                  <span className={`latest-code-text`}>{temas.codigo}</span>
                </Box>
              </Paper>
            </Box>
          )
        })

      }
    </>
  )
}

const LatestIndicadores = () => {
  const { data: indicadores, loading } = useSWR('/indicadores?sortBy=updatedAt&order=DESC&perPage=10', fetcher)
  if (loading) {
    return <CircularProgress />
  }
  return (
    <>
      {
        indicadores?.slice((indicadores.length - 3), indicadores.length).reverse().map((indicator, i) => {
          return (
            <Box key={indicator.id}>
              <Paper className='latest-all-item' variant='outlined' style={{ borderRadius: '15px' }}>
                <Box className='latest-all-left'>
                  <Box className='latest-picture'>
                    <Avatar src={indicator.nombre} alt={indicator.nombre} {...stringAvatar(indicator.nombre)} />
                  </Box>
                  <Box className='latest-all-info'>
                    <span className='latest-all-name'>{indicator.nombre}</span>
                  </Box>
                </Box>
                <Box className='latest-status'>
                  <span className={`latest-code-text`} title="FID">{indicator.id}</span>
                </Box>
              </Paper>
            </Box>
          )
        })
      }</>
  );
}