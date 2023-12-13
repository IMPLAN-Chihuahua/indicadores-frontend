import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './personalLoader.css';

const PersonalLoader = ({ size = 100 }) => {
  return (
    <Box className={'loader-container'}>
      <CircularProgress size={size} color={'primary'} />
    </Box>
  )
}

export default PersonalLoader