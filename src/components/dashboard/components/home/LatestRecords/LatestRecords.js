import React, { useMemo } from 'react';
import { Avatar, Box, Grid, Paper, Skeleton, Stack, Typography } from '@mui/material';
import useSWR from 'swr';
import { protectedApi } from '../../../../../services';
import { useTemas } from '../../../../../services/temaService';
import './latestRecords.css';

function stringToColor(string) {
  let hash = 0;
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  const h = Math.abs(hash) % 360;

  const s = 65 + (Math.abs(hash) % 20);

  const l = 80 + (Math.abs(hash) % 10);

  return `hsl(${h}, ${s}%, ${l}%)`;
}

function stringAvatar(name) {
  if (!name) return {};

  const bgColor = stringToColor(name);

  const textColor = bgColor.replace(/(\d+)%\)$/, "30%)");

  return {
    sx: {
      bgcolor: bgColor,
      color: textColor, // Texto oscuro sobre fondo pastel para legibilidad
      fontWeight: 'bold',
      fontSize: '1.1rem'
    },
    children: `${name.split(' ')[0][0].toUpperCase()}`,
  };
}
const fetcher = (url) => protectedApi.get(url).then(res => res.data.data);

const RecordItem = ({ title, avatarSrc, avatarName, badgeContent, badgeClass, isLoading }) => {
  if (isLoading) {
    return (
      <Box mb={1}>
        <Box display="flex" alignItems="center" gap={2}>
          <Skeleton variant="circular" width={45} height={45} />
          <Box flexGrow={1}>
            <Skeleton variant="text" width="60%" height={20} />
          </Box>
          <Skeleton variant="rectangular" width={60} height={20} />
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Paper className='latest-all-item' variant='outlined' sx={{ borderRadius: '15px', mb: 1, p: 1 }}>
        <Box className='latest-all-left' sx={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          <Box className='latest-picture' mr={2}>
            <Avatar
              alt={title}
              src={avatarSrc}
              sx={{ height: 45, width: 45 }}
              {...(!avatarSrc && stringAvatar(avatarName || title))}
            />
          </Box>
          <Box className='latest-all-info' sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            <span className='latest-all-name' title={title}>{title}</span>
          </Box>
        </Box>
        <Box className='latest-status' ml={1}>
          <span className={badgeClass}>{badgeContent}</span>
        </Box>
      </Paper>
    </Box>
  );
};

export const LatestRecords = () => {
  return (
    <Box mt={3}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={5}>
          <Paper variant='outlined' sx={{ p: 2, height: '100%' }}>
            <Typography variant='h6' mb={2}>Usuarios Recientes</Typography>
            <LatestUsuarios />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={7} className='latest-right-box'>
          <Stack direction='column' spacing={3}>
            <Paper sx={{ p: 2 }} variant='outlined'>
              <Typography variant='h6' mb={2}>Temas de Interés</Typography>
              <LatestTemas />
            </Paper>

            <Paper sx={{ p: 2 }} variant='outlined'>
              <Typography variant='h6' mb={2}>Últimos indicadores modificados</Typography>
              <LatestIndicadores />
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}


const LatestUsuarios = () => {
  const { data: usuarios, loading } = useSWR('/usuarios', fetcher);

  const activeLatestUsers = useMemo(() => {
    return usuarios
      ?.filter(user => user.activo)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 7) || [];
  }, [usuarios]);

  if (loading) return Array(5).fill(0).map((_, i) => <RecordItem key={i} isLoading={true} />);

  return (
    <>
      {activeLatestUsers.map((user) => (
        <RecordItem
          key={user.id}
          title={`${user.nombres} ${user.apellidoPaterno || ''}`}
          avatarSrc={user.urlImagen}
          avatarName={user.nombres}
          badgeContent="Activo"
          badgeClass="latest-status-text active"
        />
      ))}
      {activeLatestUsers.length === 0 && <Typography variant="body2">No hay usuarios activos recientes.</Typography>}
    </>
  );
}

const LatestTemas = () => {
  const { temas, isLoading } = useTemas({ page: 1, perPage: 3, sortBy: 'updatedAt', order: 'DESC' });

  if (isLoading) return Array(3).fill(0).map((_, i) => <RecordItem key={i} isLoading={true} />);

  return (
    <>
      {temas.map(tema => (
        <RecordItem
          key={tema.id}
          title={tema.temaIndicador}
          avatarSrc={tema.urlImagen}
          badgeContent={tema.codigo}
          badgeClass="latest-code-text"
        />
      ))}
    </>
  )
}

const LatestIndicadores = () => {
  const { data: indicadores, loading } = useSWR('/indicadores?sortBy=updatedAt&order=DESC&perPage=1000', fetcher);

  const topIndicadores = useMemo(() => {
    if (!indicadores) return [];
    return [...indicadores]
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 3);
  }, [indicadores]);

  if (loading) return Array(3).fill(0).map((_, i) => <RecordItem key={i} isLoading={true} />);

  return (
    <>
      {topIndicadores.map((indicator) => (
        <RecordItem
          key={indicator.id}
          title={indicator.nombre}
          avatarName={indicator.nombre}
          badgeContent={indicator.id}
          badgeClass="latest-code-text"
        />
      ))}
    </>
  );
}