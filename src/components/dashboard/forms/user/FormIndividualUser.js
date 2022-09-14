import React from 'react'
import { DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, InputLabel, MenuItem, Select, Switch, Button } from '@mui/material';
import { Profile } from '../../../../pages/Profile';
import './FormIndividualUser.css'

const FormIndividualUser = ({ handleCloseModal }) => {
  return (
    <div>
      <DialogContent className='toast'>
        <Profile />
      </DialogContent>
    </div>
  )
}

export default FormIndividualUser