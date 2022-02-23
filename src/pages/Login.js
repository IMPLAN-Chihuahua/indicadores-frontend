import { Fade } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState, useEffect } from 'react'
import Copyright from '../components/Copyright'
import LoginComponent from '../components/LoginComponent'


export const Login = () => {
    const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
      setShowLogin(true)
      return () => {
        setShowLogin(false)
     }
    }, [])
    

  return (
    <Box sx={{
        background:'linear-gradient(to top, #005aa7, #fffde4)',
        height: '110vh',
        display: 'flex',
        justifyContent:'center',
        alignItems: 'top',
        }}>
        <Fade in={showLogin} timeout={1500}>
        <Box sx={
          theme => ({
            boxShadow: '0px 2px 3px 1px rgba(255, 255, 255, 0.4)',
            mt: '5%',
            height: '480px',
            width: '420px',
            backgroundColor: 'rgb(255,255,255,0.90)',
            p: '1% 1% 1% 1%',
        
            

          })

        }>
            <LoginComponent/>
        <Box sx={{display: 'flex', justifyContent: 'center', mt:'5%'}}>
            <Copyright />
        </Box>
        </Box>
        </Fade>

    </Box>
  )
}
