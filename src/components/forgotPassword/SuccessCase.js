import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';import { Button } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import './FpCases.css'
export const SuccessCase = () => {
  return (
    <>
    <div className='fpc-container'>
      <div style={{textAlign:'center'}}>
      <h1>Recuperación de cuenta</h1>
      <h2><CheckCircleOutlineIcon style={{fontSize:'120px'}}/></h2>
      <p>La contraseña fue restablecida</p>
      <Link to='/login' style={{textDecoration:'none'}}>
      <Button variant='outlined'>Volver al inicio de sesión</Button>
      </Link>
      </div>
    </div>
    </>
  )
}
