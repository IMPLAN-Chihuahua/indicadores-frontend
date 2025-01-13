import React from 'react'
import '../indicator.css'
import {
  Grid, TextField,
  Typography, Box, Stack,
  Divider
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AutoCompleteInput from '../../../../../common/AutoCompleteInput';
import { parseDate } from '../../../../../../utils/dateParser';
import { getObjetivosGeneralInfo } from '../../../../../../services/dimensionService';
import { getTemas } from '../../../../../../services/temaService';

const temasFetcher = async () => {
  let temas = await
    getTemas();
  temas = temas.map(({ id, temaIndicador }) => ({ id, temaIndicador }))
  return temas;
};

const GeneralInformation = () => {
  const { control } = useFormContext();

  return (
    <Grid item xs={12} md={6} sx={{
      p: 1,
      height: '100%',
    }}>
      <Stack
        gap={2}
        sx={{
          backgroundColor: 'white',
          p: 2,
          height: '100%'
        }}>
        <Typography variant='h5'>Información básica</Typography>
        <Divider sx={{ lineHeight: 0 }} />
        <Controller
          name="definicion"
          control={control}
          render={({
            field: { onChange, value },
            fieldState: { error }
          }) => (
            <TextField
              label='Definición'
              type='text'
              placeholder='Hogares donde una mujer es reconocida como jefa de familia por los miembros el hogar.'
              multiline
              rows={5}
              size='small'
              required
              autoComplete='off'
              error={!!error}
              helperText={error ? error.message : null}
              onChange={onChange}
              value={value}
              fullWidth

            />
          )}
        />

        <Controller
          name="observaciones"
          control={control}
          render={({
            field: { onChange, value },
            fieldState: { error }
          }) => (
            <TextField
              label='Observaciones adicionales'
              type='text'
              placeholder='Comentarios del autor'
              multiline
              rows={4}
              size='small'
              fullWidth
              error={!!error}
              helperText={error ? error.message : null}
              onChange={onChange}
              value={value}
            />
          )}
        />

        <Controller
          name="elif"
          control={methods.control}
          render={({
            field: { onChange, value },
            fieldState: { error }
          }) => (
            <TextField
              label='ELI5'
              type='text'
              placeholder='Explícame este concepto como si tuviera 5 años'
              multiline
              rows={4}
              size='small'
              fullWidth
              error={!!error}
              helperText={error ? error.message : null}
              onChange={onChange}
              value={value}
            />
          )}
        />

        <Controller
          name='fuente'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error }
          }) =>
          (
            <TextField
              label='Fuente de información'
              type='text'
              placeholder='Fuente: DDUE (2020). Vuelo aéreo de la Dirección de Desarrollo Urbano y Ecología 2020 en SADRE.'
              required
              autoComplete='off'
              sx={{ width: '100%' }}
              error={!!error}
              helperText={error ? error.message : null}
              variant='outlined'
              onChange={onChange}
              value={value}
              className='indicador-info-input'
            />
          )
          }
        />
      </Stack>
    </Grid>
  )
}

export default GeneralInformation