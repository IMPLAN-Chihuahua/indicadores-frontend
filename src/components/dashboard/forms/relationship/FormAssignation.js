import { Box, Button, Checkbox, FormControlLabel, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useUsers } from '../../../../services/userService';
import { useParams } from 'react-router-dom';
import { createRelationUsersIndicadores } from '../../../../services/usuarioIndicadorService';
import Swal from 'sweetalert2';
import './FormAssignation.css';


export const FormAssignation = ({
  indicadores, setSelectedIndicadores, close
}) => {
  const [usersId, setUsersId] = React.useState([]);

  const handleDelete = (id) => {
    setSelectedIndicadores(indicadores.filter((item) => item.id !== id));
  }

  const handleUserChecking = (id) => {
    if (usersId.includes(id)) setUsersId(usersId.filter((item) => item !== id))
    else setUsersId([...usersId, id])
  }

  const submitAssignation = async () => {
    const indicadoresArray = indicadores.map((item) => {
      return item.id
    })

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se asignarán los indicadores seleccionados a los usuarios seleccionados',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, asignar',
      cancelButtonText: 'Cancelar',
      customClass: {
        container: 'zIndex'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        await createRelationUsersIndicadores(indicadoresArray, usersId).then(() => {
          Swal.fire({
            title: 'Asignación exitosa',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar',
            //set z index on top
            customClass: {
              container: 'zIndex'
            }
          }).then(() => {
            close();
          })
            .catch((error) => {
              Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al asignar los indicadores',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar',
                //set z index on top
                customClass: {
                  container: 'zIndex'
                }
              })
            })
        })
      }
    })

  }

  const { users, isLoading, mutate } = useUsers({ perPage: 100, activo: 'SI' });

  const handleDeleteIndicador = (id) => {
    setSelectedIndicadores(indicadores.filter((item) => item.id !== id));
    if (indicadores.length === 1) {
      close();
    }
  }


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
                  onClick={() => handleDeleteIndicador(item.id)}
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
              users?.map((item, idx) => (
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  alignContent: 'center',
                }}>
                  <FormControlLabel control={
                    <Checkbox
                      onChange={() => handleUserChecking(item.id)}
                      checked={usersId.includes(item.id)}
                    />
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
      <Button variant="contained" sx={{ m: 2 }}
        onClick={submitAssignation} color="primary"
      >
        Asignar
      </Button>
    </Box>
  )
}