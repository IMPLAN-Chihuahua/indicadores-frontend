import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react'
import '../../pages/styles/profile.css'
import { Avatar, Button, DialogActions, Grid, TextField, Typography } from '@mui/material';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import FileInput from '../common/FileInput';
import { updateProfile } from '../../services/userService';

export const NormalView = ({ user }) => {

  const methods = useForm({
    defaultValues: {
      correo: user.correo,
      descripcion: user.descripcion,
      urlImagen: user.urlImagen,
    },
    mode: 'onBlur'
  });

  const onSubmit = async (data) => {
    const { ...user } = data;
    const formData = new FormData();

    for (const key in user) {
      if (key === 'urlImagen' && user[key]) {
        formData.append(key, user[key][0]);
      }
      if (user[key]) {
        formData.append(key, user[key]);
      }
    }

    try {
      await updateProfile(formData);
    }
    catch (error) {
      console.log(error);
    }

  }

  return (
    <FormProvider {...methods}>
      <Box
        component='form'
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
        onReset={methods.reset}
        className="profile-centered-view"
      >
        <Box className="profile-data">
          <Controller
            name="urlImagen"
            control={methods.control}
            render={({
              field: { onChange, value },
              fieldState: { error }
            }) => (
              <FileInput
                accept='image/png, image/jpg, image/jpeg, image/gif'
                name='urlImagen'
                image={value}
                type={'avatar'}
                klass="profile-picture"
              />
            )}
          />
          {/* <Avatar alt={`Fotografía de ${user.nombres}`} src={user.urlImagen} sx={{ height: 220, width: 220 }} className="profile-picture" /> */}
          <Box className='profile-gral-info'>

            <Typography variant="h5" className="profile-name">{user.nombres} {user.apellidoPaterno}</Typography>
            <Typography variant="subtitle1" className="profile-role">Administrador</Typography>
          </Box>
          <Box className="profile-stats">
            <Box>
              <Typography variant="subtitle1" className="profile-stat-number">108</Typography>
              <Typography variant="subtitle1" className="profile-stat-text">Indicadores</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1" className="profile-stat-number">10/10/2022</Typography>
              <Typography variant="subtitle1" className="profile-stat-text">Registro</Typography>
            </Box>
          </Box>
          <hr className="profile-hr" />
          <Box>
            <Controller
              name="descripcion"
              control={methods.control}
              render={({
                field: { onChange, value },
                fieldState: { error }
              }) => (
                <TextField
                  label='Descripción'
                  type='text'
                  required
                  placeholder='johndoe@email.com'
                  error={!!error}
                  helperText={error ? error.message : null}
                  onChange={onChange}
                  value={value}
                  fullWidth
                  multiline
                  className="profile-stat-descripcion"
                />
              )}
            />
            <Controller
              name="correo"
              control={methods.control}
              render={({
                field: { onChange, value },
                fieldState: { error }
              }) => (
                <TextField
                  label='Correo electrónico'
                  type='text'
                  required
                  placeholder='johndoe@email.com'
                  error={!!error}
                  helperText={error ? error.message : null}
                  onChange={onChange}
                  value={value}
                  fullWidth
                  className="profile-stat-descripcion"
                />
              )}
            />
          </Box>
          <DialogActions>
            <Button>Cancelar</Button>
            <Button variant='contained' type='submit'>Guardar</Button>
          </DialogActions>
        </Box>
      </Box >
    </FormProvider>
  )
}