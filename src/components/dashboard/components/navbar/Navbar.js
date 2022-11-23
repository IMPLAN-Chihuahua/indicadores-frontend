import React from 'react'
import './navbar.css'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Box, Avatar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import { nameConstructor } from '../../../../utils/nameValidator';

export const Navbar = () => {

  const { user, handleLogOut } = useAuth();
  return (
    <Box className='navbar'>
      <Box className='navbar-wrapper'>
        <Box className='navbar-left'>
          <Link to='/' className='link-to-profile'>
            Chihuahua en Datos
          </Link>
        </Box>
        <Box className='navbar-right'>
          <Box className='navbar-rigth-options'>
            <Box className='navbar-option'>
              <Avatar className='navbar-option-icon' src={`${user.urlImagen}`} sx={{ width: 40, height: 40 }} />
              <div className='navbar-user-info'>
                <Typography>{`${nameConstructor(user.nombres, user.apellidoPaterno)}`}</Typography>
                <Typography variant='caption'>{`${user.roles === 'ADMIN' ? 'Administrador' : 'Usuario'}`}</Typography>
              </div>
            </Box>
            <Box className='navbar-option-close' onClick={handleLogOut}>
              <ExitToAppIcon className='navbar-option-icon' />
              <span className='navbar-option-text'>Cerrar sesión</span>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
