import React from 'react'
import '../indicator.css'
import {
  Grid, TextField,
  Typography, Checkbox, FormControlLabel, Box,
  Divider
} from '@mui/material';
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form';
import { parseDate } from '../../../../../../utils/dateParser';

const IndicatorValues = () => {
  const { control, getValues } = useFormContext();
  const updatedAt = getValues('updatedAt')
  return (
    <Grid container item xs={12} md={12} className='indicador-element' sx={{ display: 'flex', mb: 3 }}>
      <Grid item xs={12} md={6} sx={{ p: 1 }}>
        <Typography variant='h5'>
          Último valor disponible
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ p: 2, width: '40%' }}>
            <Controller
              name='ultimoValorDisponible'
              control={control}
              render={({
                field,
                fieldState: { error }
              }) => (
                (
                  <TextField
                    size='small'
                    label='Valor'
                    type='text'
                    required
                    autoComplete='off'
                    fullWidth
                    error={!!error}
                    helperText={error ? error.message : null}
                    variant='outlined'
                    {...field}
                  />
                )
              )}
            />
          </Box>
          <Box sx={{ p: 2, width: '60%' }}>
            <Controller
              name='adornment'
              control={control}
              render={({
                field,
                fieldState: { error }
              }) => (
                (
                  <TextField
                    size='small'
                    label='Simbología'
                    type='text'
                    required
                    autoComplete='off'
                    error={!!error}
                    fullWidth
                    helperText={error ? error.message : null}
                    variant='outlined'
                    {...field}
                  />
                )
              )}
            />
          </Box>
          <Box sx={{ p: 2, width: '100%' }}>
            <Controller
              name='unidadMedida'
              control={control}
              render={({
                field,
                fieldState: { error }
              }) => (
                (
                  <TextField
                    size='small'
                    label='Unidad de medida'
                    type='text'
                    required
                    autoComplete='off'
                    error={!!error}
                    fullWidth
                    helperText={error ? error.message : null}
                    variant='outlined'
                    {...field}
                  />
                )
              )}
            />
          </Box>
          <Box sx={{ p: 2, width: '40%' }}>
            <Controller
              name="periodicidad"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error }
              }) => (
                <TextField
                  size='small'
                  label='Periodicidad'
                  type='number'
                  placeholder='Tiempo entre actualizaciones'
                  error={!!error}
                  fullWidth
                  helperText={error ? error.message : null}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={1} sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 1
      }}>
        <Divider orientation='vertical' sx={{
          height: '60%',
        }} />
      </Grid>
      <Grid item xs={12} md={5} sx={{ p: 1 }}>
        <Typography variant='h5' sx={{ pl: 2 }}>
          Año de la última actualización
        </Typography>
        <Box sx={{
          display: 'flex',
          alginItems: 'center',
        }}>
          <Box sx={{ py: 2, px: 1 }}>
            <Controller
              name='anioUltimoValorDisponible'
              control={control}
              render={({
                field,
                fieldState: { error }
              }) => (
                (
                  <TextField
                    size='small'
                    type='text'
                    required
                    label='Año último valor disponible'
                    fullWidth
                    autoComplete='off'
                    error={!!error}
                    helperText={error ? error.message : null}
                    variant='outlined'
                    {...field}
                  />
                )
              )}
            />
          </Box>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-evenly'
          }}>
            <Box sx={{ lineHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                Fecha de actualización
              </Typography>
              <Typography>
                {parseDate(updatedAt)}
              </Typography>
            </Box>
            <Box sx={{ pl: 3, lineHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                Fecha de creación
              </Typography>
              <Typography>
                {parseDate(updatedAt)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default IndicatorValues