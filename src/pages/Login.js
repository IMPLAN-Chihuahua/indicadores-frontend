import { Fade } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState, useEffect } from 'react'
import Copyright from '../components/Copyright'
import LoginComponent from '../components/LoginComponent'
import './styles/login.css'

export const Login = () => {
    const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
      setShowLogin(true)
      return () => {
        setShowLogin(false)
     }
    }, [])
    

  return (
    <div className='login'>
        <Fade in={showLogin} timeout={1500}>
          <div className='login-container-left'></div>
        </Fade>
        <Fade in={showLogin} timeout={1500}>
          <div className='login-container-right'>
          <div className='login-component'>
          <LoginComponent/>
          </div>
          </div>
        </Fade>
    </div>
  )
}
