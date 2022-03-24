import React from 'react';
import { Grid, IconButton, Stack, TextField, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export const Variable = (props) => {
  return (
    // <Box
    //   component="form"
    //   backgroundColor="aliceBlue"
    // >
    //   Fields
    // </Box>
    
    <Grid
      justifyContent='flex-start'
      alignItems='center'
      columnSpacing={2}
      rowSpacing={2}
    >
      <Grid item container xs={8} columnSpacing={2}>
        <Grid item xs={6}>
          <TextField label='Variable' />
        </Grid>
        <Grid item xs={6}>
          <TextField label='Descripcion' />
        </Grid>
      </Grid>
      <Grid item container xs={3} direction='row'>
        <IconButton aria-label='Eliminar variable' onClick={props.deleteVariable}>
          <RemoveIcon />
        </IconButton>
        <IconButton aria-label='Agregar variable' onClick={props.addVariable}>
          <AddIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}