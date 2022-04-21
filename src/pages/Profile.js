import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react'
import './styles/profile.css'
import { Helmet } from "react-helmet";
import { Avatar, Grid, Typography } from '@mui/material';
import { Navbar } from '../components/dashboard/components/navbar/Navbar';
import { getCurrentUser } from '../services/userService';
import { BeatLoader } from 'react-spinners';

export const Profile = () => {
  const color1 = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  const color2 = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  const points = Math.floor(Math.random() * (30 - 10)) + 10;
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser().then(user => {
      setUser(user);
    });
    if (user) {
      setLoading(false);
    }
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
                        The electromagnetic theory was also established in the 19th century by the works of Hans Christian Ørsted, André-Marie Ampère,  Michael Faraday, James Clerk Maxwell, Oliver Heaviside, and Heinrich Hertz. The new theory raised questions that could not easily be answered using Newton's framework. The phenomena that would allow the deconstruction of the atom were discovered in the last decade of the 19th century: the discovery of X-rays inspired the discovery of radioactivity. In the next year came the discovery of the first subatomic particle, the electron.
                      </Typography>
                    </Grid>
                  </Grid>

                </Box>
              </Box>
            </Box>
          )
          :
          (
            <Box className='dt-loading'>
              <BeatLoader size={50} color="#1976D2" />
            </Box>
          )
      }

    </>

  )
}