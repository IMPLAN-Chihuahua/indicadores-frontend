import React from 'react'
import { UserInformation } from '../components/dashboard/components/home/userInformation/UserInformation'
import { Featured } from '../components/dashboard/components/home/featured/Featured'
import { LatestRecords } from '../components/dashboard/components/home/LatestRecords/LatestRecords'
import { Box } from '@mui/material'

export const Home = () => {
  return (
    <Box sx={{
      flex: '1 1 auto',
      overflowY: 'scroll',
      backgroundColor: 'var(--gray-95)',
      p: { xs: 1, md: 3 }
    }}>
      <UserInformation />
      <Featured />
      <LatestRecords />
    </Box>
  )
}
