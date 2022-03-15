import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { Button } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import './FpCases.css'
export const ErrorCase = () => {
  return (
    <>
    <div className='fpc-container'>
      <div style={{textAlign:'center'}}>
      <h1>Recuperación de cuenta</h1>
      <h2><SentimentDissatisfiedIcon style={{fontSize:'120px'}}/></h2>
      <p>El token es invalido, intenta restablecer la contraseña de nuevo</p>
      <Link to='/recuperacion-de-cuenta' style={{textDecoration:'none'}}>
      <Button variant='outlined'>Restablecer contraseña</Button>
      </Link>
      <div className='fp-fotter'>
                <hr/>
                <p><Link to="/login" underline="hover" variant="body2" >¿Recordaste tu contraseña?</Link></p>
            </div>
      </div>
    </div>
    </>
  )
}
