import { Button, TextField } from '@mui/material'
import React from 'react'
import './FpCases.css'

export const UpdatedCase = () => {
  return (
    <>
    <div className='fpc-container'>
     <h1 style={{textAlign:'center'}}>Recuperación de cuenta</h1>
        <p>Introduce la nueva contraseña</p>
        <TextField label='Contraseña' variant='standard' className='fpc-textfield'/> 
        <p>Introduce otra vez la nueva contraseña</p>
        <TextField label='Confirmar contraseña' variant='standard' className='fpc-textfield'/>  
        <div className='btn-recover-account'>
        <Button variant='outlined'>Cambiar contraseña</Button>
        </div> 
    
    </div>
    </>
  )
}
