import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react'
import './styles/profile.css'
import { Helmet } from "react-helmet";
import { Avatar, Button, Grid, Typography } from '@mui/material';
import { Navbar } from '../components/dashboard/components/navbar/Navbar';
import { getCurrentUser } from '../services/userService';
import { BeatLoader } from 'react-spinners';
import { NormalView } from '../components/profile/NormalView';
import { EditView } from '../components/profile/EditView';

export const Profile = () => {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);

  const handleEditing = () => {
    setEditing(!editing);
  }

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
                  <Button variant='outlined' className='edit-button' onClick={handleEditing}>Editar</Button>
                </Box>
                {
                  !editing ?
                    <NormalView user={user} />
                    :
                    <EditView user={user} />
                }
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