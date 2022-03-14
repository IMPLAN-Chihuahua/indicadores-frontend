import React from 'react'
import { UserInformation } from '../components/dashboard/components/home/userInformation/UserInformation'
import { Featured } from '../components/dashboard/components/home/featured/Featured'
import { LastedRecords } from '../components/dashboard/components/home/LastedRecords/LastedRecords'
import { MathInput } from '../components/common/mathInput/MathInput'

export const Home = () => {
  return (
    <>
    <UserInformation/>
    <Featured />
    <LastedRecords/>
    
    </>
  )
}
