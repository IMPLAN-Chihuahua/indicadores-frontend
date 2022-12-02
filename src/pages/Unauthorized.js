import { Box, Button } from '@mui/material'
import React from 'react'
import './styles/unauthorized.css'

const Unauthorized = () => {
  return (
    <Box className="unauthorized-container">
      <h1>🔐</h1>
      <h3>Acceso no permitido</h3>
      <h3>Lo sentimos, pero parece que no formas parte del directorio administrativo del sistema. Si consideras que es un error, ponte en contacto con algún administrador.</h3>
      <br />
      <Button variant="contained" color="primary" href="/">Volver al inicio</Button>
    </Box>
  )
}

export default Unauthorized