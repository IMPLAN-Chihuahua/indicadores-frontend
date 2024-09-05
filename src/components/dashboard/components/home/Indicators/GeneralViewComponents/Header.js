import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import React from 'react'
import CustomizedMenus from './MenuButton'
import EditIcon from '@mui/icons-material/Edit';
import { Controller } from 'react-hook-form';

const Header = ({ methods }) => {
  const [display, setDisplay] = React.useState('none')
  const [edit, setEdit] = React.useState(false)

  return (
    <Grid container item xs={12} sx={{
      display: 'flex', justifyContent: 'space-between', mb: 1,
    }}>
      <Grid item xs={12} md={6} sx={{
        display: 'flex', alignItems: 'center'
      }}
        onMouseEnter={() => setDisplay('block')}
        onMouseLeave={() => setDisplay('none')}
      >
        {
          edit ?
            <Controller
              name='nombre'
              control={methods.control}
              render={({ field: { onChange, value }, fieldState: { error }
              }) => (
                <TextField
                  label='Nombre'
                  type='text'
                  placeholder='Porcentaje de hogares con jefatura femenina.'
                  required
                  autoComplete='off'
                  error={!!error}
                  helperText={error ? error.message : null}
                  variant='outlined'
                  onChange={onChange}
                  value={value}
                  fullWidth
                />
              )
              }
            />
            :
            <Typography variant='h4' fontWeight={300}>
              {methods.getValues('nombre')}
            </Typography>
        }

        <Box sx={{
          pl: 2,
          display: edit ? 'block' : display,
        }}>
          <IconButton>
            <EditIcon onClick={() => setEdit(!edit)} />
          </IconButton>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} sx={{
        display: 'flex', justifyContent: 'flex-end',
      }}>
        <CustomizedMenus />
      </Grid>
    </Grid>
  )
}

export default Header