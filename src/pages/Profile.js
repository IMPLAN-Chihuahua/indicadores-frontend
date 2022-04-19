import { Container } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react'
import './styles/profile.css'

export const Profile = () => {
  const color1 = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  const color2 = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  return (
    <Box style={{ background: `linear-gradient(to right bottom, ${color1}, ${color2})` }} className='color-panel'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='waves'>
        <path
          fill="#0099ff"
          fill-opacity="0.2"
          d="M0,256L102.9,160L205.7,32L308.6,64L411.4,32L514.3,160L617.1,288L720,96L822.9,320L925.7,32L1028.6,96L1131.4,128L1234.3,256L1337.1,320L5440,288L1440,320L1337.1,320L1234.3,320L1131.4,320L1028.6,320L925.7,320L822.9,320L720,320L617.1,320L514.3,320L411.4,320L308.6,320L205.7,320L102.9,320L0,320Z">
        </path>
      </svg>
    </Box>
  )
}