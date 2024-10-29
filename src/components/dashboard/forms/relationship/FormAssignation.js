import { Box, Button, Checkbox, FormControlLabel, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useUsers } from '../../../../services/userService';

const FormAssignation = ({
  indicadores, setSelectedIndicadores
}) => {

  const handleDelete = (id) => {
    setSelectedIndicadores(indicadores.filter((item) => item.id !== id));
  }

  const { users, isLoading, mutate } = useUsers(100, 1, '');

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ p: 2 }}
      >
        Se asignarán los indicadores seleccionados
      </Typography>

      <Grid container sx={{ p: 2 }}>
        <Grid item xs={12} md={5} sx={{
          border: '1px solid #d2d2d2',
          p: 2,
          maxHeight: 400,
          overflowY: 'auto',
        }}>
          {
            indicadores.map((item, index) => (
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                alignContent: 'center',
              }}>
                <IconButton
                  sx={{
                    '&:hover': {
                      color: 'red',
                      transition: '0.3s',
                    }
                  }}
                  title='Eliminar indicador del listado'
                  onClick={() => handleDelete(item.id)}
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
                <Typography key={index} variant="p">
                  {item.nombre}
                </Typography>
              </Box>
            ))
          }
        </Grid>
        <Grid item xs={12} md={2} sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <SyncAltIcon fontSize='large' />
        </Grid>

        <Grid item xs={12} md={5} sx={{
          border: '1px solid #d2d2d2',
          p: 2,
          maxHeight: 400,
          overflowY: 'auto',
        }}>
          {
            isLoading ? <Typography>Cargando...</Typography> :
              users?.data?.map((item, idx) => (
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  alignContent: 'center',
                }}>
                  <FormControlLabel control={
                    <Checkbox onChange={() => console.log('hola')} />
                  }
                    label={
                      <Typography variant="p">
                        {item.nombres + ' ' + item.apellidoPaterno}
                      </Typography>
                    }
                  />
                </Box>

              ))
          }
        </Grid>
      </Grid>

      <Button variant="contained" sx={{ m: 2 }}>
        Cancelar
      </Button>

      <Button variant="contained" sx={{ m: 2 }}>
        Asignar
      </Button>
    </Box>
  )
}

export default FormAssignation