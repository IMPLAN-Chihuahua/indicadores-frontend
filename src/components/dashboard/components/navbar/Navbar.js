import React from 'react'
import './navbar.css'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export const Navbar = () => {
  return (
    <>
    <div className='navbar'>
      <div className='navbar-wrapper'>
        <div className='navbar-left'>
          O.U.T
        </div>
        <div className='navbar-right'>
          
          <div className='navbar-rigth-options'>
            
            <div className='navbar-option'>
            <AccountCircleIcon className='navbar-option-icon' /> 
            <span className='navbar-option-text'>Jhon Doe</span>
            </div>
            
            <div className='navbar-option-close'>
            <ExitToAppIcon className='navbar-option-icon'/>
            <span className='navbar-option-text'>Cerrar sesión</span>
            </div>

          </div>
        </div>
      </div>

    </div>
    </>

  )
}
