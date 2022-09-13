import React from 'react'
import './navbar.css'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Box, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';

export const Navbar = () => {

  const { user, handleLogOut } = useAuth();
  return (
    <>
      <Box className='navbar'>
        <Box className='navbar-wrapper'>
          <Box className='navbar-left'>
            <Link to='/' className='link-to-profile'>
              {/* <img src='logo_chihuahua_metrica.webp' alt='logo' className='logo' style={{ width: 200 }} /> */}
              Chihuahua en Datos
            </Link>
          </Box>
          <Box className='navbar-right'>

            <Box className='navbar-rigth-options'>
              <Link to='/profile' className='link-to-profile'>
                <Box className='navbar-option'>
                  <Avatar className='navbar-option-icon' src={`${user.urlImagen}`} sx={{ width: 25, height: 25 }} />
                  <span className='navbar-option-text'>{`${user.nombres} ${user.apellidoPaterno}`}</span>
                </Box>
              </Link>

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
