import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import './common.css'
export const Status = ({status}) => {
  return (
      (status == 'activo')
      ?<div className='dt-chip-active'> <CheckCircleIcon sx={{color:'#10A04E', paddingRight:'10px'}}/> <span className='dt-chip-active--text'>Activo</span></div>
      :<div className='dt-chip-inactive'><CancelIcon sx={{color:'#9E1010',paddingRight:'5px'}}/> <span className='dt-chip-inactive--text'>Inactivo</span></div>
  )
}
