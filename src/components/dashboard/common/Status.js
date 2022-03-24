import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import GppGoodIcon from '@mui/icons-material/GppGood';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import './common.css'
export const Status = ({status}) => {
  return (
    <>
{
     (status == 'Activo' || status == 'SI' )
     ?<div className='dt-chip-active'> <CheckCircleIcon sx={{color:'#10A04E', paddingRight:'10px'}}/> <span className='dt-chip-active--text'>Activo</span></div>
     :(status == 'Inactivo' || status == 'NO') 
     ?<div className='dt-chip-inactive'><CancelIcon sx={{color:'#9E1010',paddingRight:'5px'}}/> <span className='dt-chip-inactive--text'>Inactivo</span></div> 
     :(status == 'Administrador')
     ?<div className='dt-chip-admin'><GppGoodIcon sx={{color:'#01579b',paddingRight:'5px'}}/> <span className='dt-chip-admin--text'>Administrador</span></div> 
     :(status == 'Usuario')
     ?<div className='dt-chip-user'><PersonIcon sx={{color:'#546e7a',paddingRight:'5px'}}/> <span className='dt-chip-user--text'>Usuario</span></div>
     :(status == 'DESCENDENTE')
     ?<div><ArrowDownwardIcon/></div> 
     :(status == 'ASCENDENTE')
     ?<div><ArrowDownwardIcon/></div> 
     :<h3>N/A</h3>
}   
    </>
  )
}
