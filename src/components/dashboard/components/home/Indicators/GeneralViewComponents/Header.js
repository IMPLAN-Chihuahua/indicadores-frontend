import { Box, Button, CircularProgress, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { lazy, Suspense } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { Controller, useFormContext } from 'react-hook-form';
import CustomizedMenus from './MenuButton'

const Header = () => {
  const { control, getValues } = useFormContext();
  const [display, setDisplay] = React.useState('none')
  const [edit, setEdit] = React.useState(false)
  const nombre = getValues('nombre')

  return (
    <Grid container item xs={12} sx={{
      display: 'flex', mb: 1,
    }}>
      <Grid item xs={12} md={7} sx={{
        display: 'flex', width: '100%',
      }}
        onMouseEnter={() => setDisplay('block')}
        onMouseLeave={() => setDisplay('none')}
      >
        {
          edit ?
            <Controller
              name='nombre'
              control={control}
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
              {nombre}
            </Typography>
        }
        <Box sx={{
          display: edit ? 'block' : display
        }}>
          <IconButton onClick={() => setEdit(!edit)}>
            <EditIcon />
          </IconButton>
        </Box>

      </Grid>
      <Grid item xs={12} md={5} sx={{
        display: 'flex', justifyContent: 'flex-end',
      }}>
        <CustomizedMenus />
      </Grid>
    </Grid>
  )
}

export default Header