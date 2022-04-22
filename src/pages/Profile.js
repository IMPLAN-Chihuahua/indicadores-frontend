import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react'
import './styles/profile.css'
import { Helmet } from "react-helmet";
import { Avatar, Button, Grid, Typography } from '@mui/material';
import { Navbar } from '../components/dashboard/components/navbar/Navbar';
import { getCurrentUser } from '../services/userService';
import { BeatLoader } from 'react-spinners';

export const Profile = () => {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getCurrentUser().then(user => {
      setUser(user);
    });
  }, []);

  const isEmpty = Object.keys(user).length === 0;

  return (
    <>
      {
        !isEmpty ?
          (
            <Box className='profile'>
              <Helmet>
                <body className='profile-body' />
              </Helmet>
              <Navbar />
              <Box className='profile-container'>
                <Box className='h500'>
                </Box>
                <Box className='bottom-right'>
                  <Button variant='outlined'>Editar</Button>
                </Box>
                <Box className='bottom-centered'>
                  <Grid container className='profile-grid'>
                    <Grid item xs={12} md={12} className='profile-grid-item'>
                      <Box className='user-image-container'>
                        <Avatar className='user-image' sx={{ width: 170, height: 170 }} src={`http://localhost:8080/${user.avatar}`}>
                        </Avatar>
                        <h1 className='user-role'>{
                          user.roles === 'ADMIN' ? 'Admin' : 'Usuario'
                        }</h1>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={12} className='profile-grid-item'>
                      <Typography variant='h4' className='user-name'>
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
              </Box>
            </Box>
          )
          :
          (
            <>
              <Navbar />
              <Box className='dt-loading' sx={{ mt: '15%' }}>
                <BeatLoader size={50} color="#1976D2" />
              </Box>
            </>
          )
      }

    </>

  )
}