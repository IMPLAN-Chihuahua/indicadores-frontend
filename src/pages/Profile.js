import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react'
import './styles/profile.css'
import { Helmet } from "react-helmet";
import { Avatar, Button, Grid, Typography } from '@mui/material';
import { Navbar } from '../components/dashboard/components/navbar/Navbar';
import { getCurrentUser } from '../services/userService';
import { NormalView } from '../components/profile/NormalView';
import { EditView } from '../components/profile/EditView';
import PersonalLoader from '../components/common/PersonalLoader/PersonalLoader';

export const Profile = () => {
  const [user, setUser] = useState({});
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
              <div className='w600'></div>
              <Box className='profile-container'>
                <Box className='h500'>
                </Box>
                <NormalView user={user} />
              </Box>
            </Box>
          )
          :
          (
            <>
              <div className='w600'></div>
              <PersonalLoader />
            </>
          )
      }

    </>

  )
}