import { Button, Input, Link, TextField } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import './FpCases.css'


export const InitialCase = () => {
  return (
  <>
  <div className='fpc-container'>
      <h1 style={{textAlign:'center'}}>Recuperación de cuenta</h1>
      <p>¿Perdiste tu contraseña? Por favor, introduzca su nombre de usuario o dirección de correo electrónico. Recibirá un enlace para crear una nueva contraseña por correo electrónico.</p>
      <TextField label='Correo electronico' variant='standard' className='fpc-textfield'/>  
      <div className='btn-recover-account'>
      <Button variant='outlined'>Recuperar contraseña</Button>
      </div>
      <div className='fp-fotter'>
                <hr/>
                <Link  component={RouterLink} to="/login" underline="hover" variant="body1" >¿Recordaste tu contraseña?</Link>
                </div>
  </div>
  </>
  )
}
