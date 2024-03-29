import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Box, Button, DialogContent, DialogTitle, FormControlLabel, Grid, TextField, Typography, Checkbox } from '@mui/material'
import React from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { updateAuthSchema } from '../../../../utils/validator';
import { useState } from 'react';
import { nameConstructor } from '../../../../utils/nameValidator';
import './FormDuration.css';
import { createRelation, updateRelation } from '../../../../services/usuarioIndicadorService';
const FormDuration = ({ type, handleCloseModal, users, setUsersArray, mutate, clearUsersSelectedParams, action, relationData }) => {
  const { id } = useParams();
  const [expires, setExpires] = useState(true);
  const { control, handleSubmit, reset } = useForm(
    {
      mode: 'onBlur',
      resolver: yupResolver(updateAuthSchema),
      defaultValues: action === 'NEW' ? {} : {
        hasta: relationData.fechaHasta,
        desde: relationData.fechaDesde,
        expires: relationData.expires === 'SI' ? true : false,
      }
    }
  );

  const changeExpires = () => {
    setExpires(!expires)
  }

  const methods = useForm({
    mode: 'onBlur',
  });

  const onSubmit = data => {
    const usersId = users.map(user => user.id);
    if (expires === false || expires === 'NO') {
      data.hasta = null;
      data.desde = null;
    }

    const payload = {
      ...data,
      relationIds: action === 'NEW' ? usersId : relationData.id,
      expires: expires === true ? 'SI' : 'NO',
    };
    Swal.fire({
      customClass: {
        container: 'my-swal'
      },
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (action === 'NEW') {
          createRelation(id, payload, 'usuarios')
            .then(_ => {
              Swal.fire(
                'Guardado!',
                'Los usuarios han sido asignados.',
                'success'
              )
              mutate();
              handleCloseModal();
              setUsersArray();
              clearUsersSelectedParams();
            })
            .catch(err => {
              Swal.fire(
                'Error!',
                err,
                'error'
              )
            })
        }
        else {
          updateRelation(relationData.id, payload, 'usuarios')
            .then(_ => {
              Swal.fire(
                'Guardado!',
                'Los usuarios han sido asignados.',
                'success'
              )
              mutate();
              handleCloseModal();
              setUsersArray();
              clearUsersSelectedParams();
            })
            .catch(err => {
              Swal.fire(
                'Error!',
                err,
                'error'
              )
            })
        }
      }
    }
    )

  }

  return (
    <>
      <DialogTitle>
        {
          action === 'NEW' ? 'Asignar usuarios' : `Editar relación de ${users[0].nombres}`
        }
      </DialogTitle>
      <FormProvider {...methods}>
        <DialogContent>
          {
            action === 'NEW' && users && users.length > 0 && (
              <Box
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}
                component="form"
                noValidate
              >
                <Typography variant="h6" >Usuarios a asignar</Typography>

                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  {
                    users.map((user, index) => (
                      <Grid item xs={2} sm={4} md={4} key={index} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                        <Avatar src={user.urlImagen} title={user.nombres} className='avatar-img' />
                        <Typography variant="caption" sx={{ fontWeight: 'bold' }} className='user-text'>{nameConstructor(user.nombres, user.apellidoPaterno)}</Typography>
                      </Grid>
                    ))
                  }
                </Grid>
              </Box>
            )
          }
          <Box sx={{ display: 'flex', mt: 3, columnGap: 2 }}>
            <Controller
              name='desde'
              control={control}
              defaultValue=''
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <TextField
                  type="date"
                  value={value}
                  onChange={onChange}
                  label="Fecha de inicio"
                  InputLabelProps={{ shrink: true }}
                  error={!!error}
                  helperText={error ? error.message : null}
                  fullWidth
                  disabled={!expires}
                />
              )}
            />
            <Controller
              name='hasta'
              control={control}
              defaultValue=''
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                < TextField
                  type="date"
                  value={value}
                  onChange={onChange}
                  label="Fecha de expiración"
                  InputLabelProps={{ shrink: true }}
                  error={!!error}
                  helperText={error?.message}
                  fullWidth
                  disabled={!expires}
                />
              )}
            />
            <Controller
              name='expires'
              control={control}
              defaultValue={true}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <FormControlLabel
                  control={
                    setExpires(value),
                    < Checkbox
                      checked={value === 'SI' ? true : value === 'NO' ? false : value}
                      onChange={onChange}
                      name="expires"
                      color="primary"
                      onClick={changeExpires}
                    />
                  }
                  label="Expira"
                />
              )}
            />

          </Box>
          {/* Create an accept button */}

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleCloseModal}
              >
                Cancelar
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleSubmit(onSubmit)}
              >
                Aceptar
              </Button>
            </Grid>
          </Grid>

        </DialogContent>
      </FormProvider>
    </>
  )
}

export default FormDuration