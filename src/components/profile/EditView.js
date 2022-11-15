import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react'
import '../../pages/styles/profile.css'
import { Avatar, Button, Grid, TextField, Typography } from '@mui/material';
import 'animate.css';

import { Controller, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


import { editUserSchema } from '../../utils/userValidator';
import { updateProfile } from '../../services/userService';
import { useAlert } from '../../contexts/AlertContext';
import FileInput from '../common/FileInput';

export const EditView = ({ user }) => {
  const alert = useAlert();

  let defaultValues = {
    id: '',
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correo: '',
    descripcion: '',
    urlImagen: ''
  }

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(editUserSchema),
    mode: 'all'
  });

  useEffect(() => {
    methods.reset(user);
  }, []);

  const onSubmit = async (data) => {
    const { ...user } = data;
    const formData = new FormData();
    for (const key in user) {
      if (key === 'urlImagen' && user[key]) {
        formData.append(key, user[key][0]);

        continue;
      }

      if (user[key]) {
        formData.append(key, user[key]);
      }
    };
    try {
      await updateProfile(formData);
      alert.success('Usuario actualizado correctamente');
    } catch (error) {
      alert.error(error);
    }
  }

  return (
    <FormProvider {...methods} className=''>
      <Box
        component='form'
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
        onReset={methods.reset}
        className='bottom-centered'
      >

        <Grid container className='profile-grid animate__animated animate__fadeIn'>
          <Grid item xs={12} md={12} className='profile-grid-item'>
            <Box className='user-image-container'>
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
                  />
                )}
              />
              <h1 className='user-role'>{
                user.roles === 'ADMIN' ? 'Admin' : 'Usuario'
              }</h1>
            </Box>
          </Grid>

          <Box className='profile-grid-gral' sx={{ marginBottom: '1%' }}>

            <Grid container className='profile-grid-editable-gral'>
              <Grid item xs={12} md={6} className='profile-grid-item'>
                <Controller
                  name='nombres'
                  control={methods.control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      label='Nombres'
                      type='text'
                      placeholder='Nombre o nombres'
                      size='small'
                      required
                      autoComplete='off'
                      error={!!error}
                      helperText={error ? error.message : null}
                      variant='outlined'
                      onChange={onChange}
                      value={value}
                      sx={{ marginTop: '5%' }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6} className='profile-grid-item'>
                <Controller
                  name='apellidoPaterno'
                  control={methods.control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      label='Apellido paterno'
                      type='text'
                      placeholder='Apellido paterno'
                      size='small'
                      required
                      autoComplete='off'
                      error={!!error}
                      helperText={error ? error.message : null}
                      variant='outlined'
                      onChange={onChange}
                      value={value}
                      sx={{ marginTop: '5%' }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6} className='profile-grid-item'>
                <Controller
                  name='apellidoMaterno'
                  control={methods.control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      label='Apellido materno'
                      type='text'
                      placeholder='Apellido materno '
                      size='small'
                      required
                      autoComplete='off'
                      error={!!error}
                      helperText={error ? error.message : null}
                      variant='outlined'
                      onChange={onChange}
                      value={value}
                      sx={{ marginTop: '5%' }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6} className='profile-grid-item'>
                <Controller
                  name='correo'
                  control={methods.control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      label='Correo electrónico'
                      type='text'
                      placeholder='Correo electrónico'
                      size='small'
                      required
                      autoComplete='off'
                      error={!!error}
                      helperText={error ? error.message : null}
                      variant='outlined'
                      onChange={onChange}
                      value={value}
                      sx={{ marginTop: '5%' }}
                      disabled={user.roles === 'ADMIN' ? false : true}
                    />
                  )}
                />
              </Grid>
            </Grid>

          </Box>
          <hr className='magic-line' />
          <Grid item xs={12} md={12} className='description'>
            <Controller
              name='descripcion'
              control={methods.control}
              render={({
                field: { onChange, value },
                fieldState: { error }
              }) => (
                <TextField
                  label='Descripcion'
                  type='text'
                  placeholder='Apellido materno'
                  size='small'
                  required
                  autoComplete='off'
                  error={!!error}
                  helperText={error ? error.message : null}
                  variant='outlined'
                  onChange={onChange}
                  value={value}
                  multiline
                  rows={5}
                  fullWidth
                  sx={{ width: '80%', marginTop: '1%' }}
                />
              )}
            />
          </Grid>
        </Grid>
        <Button type='submit' variant='outlined' className='bottom-down-right'>
          Guardar
        </Button>
      </Box>
    </FormProvider>

  )
}