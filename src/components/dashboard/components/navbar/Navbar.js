import React from 'react'
import './navbar.css'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, IconButton } from '@mui/material';
import { useAuth } from '../../../../contexts/AuthContext';
export const Navbar = () => {
  const { user, handleLogOut } = useAuth();
  return (
    <>
      <Box className='navbar'>
        <Box className='navbar-wrapper'>
          <Box className='navbar-left'>
            O.U.T
          </Box>
          <Box className='navbar-right'>

            <Box className='navbar-rigth-options'>

              <Box className='navbar-option'>
                <AccountCircleIcon className='navbar-option-icon' />
                <span className='navbar-option-text'>{`${user.nombres} ${user.apellidoPaterno}`}</span>
              </Box>

              <Box className='navbar-option-close' onClick={handleLogOut}>
                <ExitToAppIcon className='navbar-option-icon' />
                <span className='navbar-option-text'>Cerrar sesión</span>
              </Box>

            </Box>
          </Box>
        </Box>

      </Box>
    </>

  )
}
