import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react'
import '../../pages/styles/profile.css'
import { Avatar, Button, Grid, Typography } from '@mui/material';

export const NormalView = ({ user }) => {
  console.log(user);
  return (
    <Box className='bottom-centered'>
      <Grid container className='profile-grid animate__animated animate__fadeInRight'>
        <Grid item xs={12} md={12} className='profile-grid-item'>
          <Box className='user-image-container'>
            <Avatar className='user-image' sx={{ width: 170, height: 170 }} src={`${user.urlImagen}`}>
            </Avatar>
            <h1 className='user-role'>{
              user.roles === 'ADMIN' ? 'Admin' : 'Usuario'
            }</h1>
          </Box>
        </Grid>
        <Grid item xs={12} md={12} className='profile-grid-item'>
          <Typography variant='h5' className='user-name'>
            {user.nombres} {user.apellidoPaterno}
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} className='profile-grid-item'>
          <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
            {user.correo}
          </Typography>
        </Grid>
        <hr className='magic-line' />
        <Grid item xs={12} md={12} className='description'>
          <Typography variant='h6' className='user-description'>
            {user.descripcion}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}