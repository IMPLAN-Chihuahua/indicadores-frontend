import React from 'react'
import { UserInformation } from '../components/dashboard/components/home/userInformation/UserInformation'
import { Featured } from '../components/dashboard/components/home/featured/Featured'
import { LatestRecords } from '../components/dashboard/components/home/LatestRecords/LatestRecords'
import { Box } from '@mui/material'

export const Home = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#F1FAFF',
        p: { xs: 1, md: 2 }
      }}
      className='fill-remaining-space'
    >
      <UserInformation />
      <Featured />
      <LatestRecords />
    </Box>
  )
}
