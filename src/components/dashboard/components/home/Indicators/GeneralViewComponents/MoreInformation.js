import React from 'react'
import '../indicator.css'
import {
  Grid, TextField,
  Typography, Stack,
  Autocomplete, MenuItem
} from '@mui/material';
import { Controller, FormProvider, useForm, useFormContext, useWatch } from 'react-hook-form';
import { useResourceList } from '../../../../../../hooks/useResourceList';
import { useObjetivos } from '../../../../../../services/objetivoService';
import { useTemas } from '../../../../../../services/temaService';


const MESES_OPTIONS = [
  { label: 'Enero', value: 1 }, { label: 'Febrero', value: 2 }, { label: 'Marzo', value: 3 },
  { label: 'Abril', value: 4 }, { label: 'Mayo', value: 5 }, { label: 'Junio', value: 6 },
  { label: 'Julio', value: 7 }, { label: 'Agosto', value: 8 }, { label: 'Septiembre', value: 9 },
  { label: 'Octubre', value: 10 }, { label: 'Noviembre', value: 11 }, { label: 'Diciembre', value: 12 }
];

const TENDENCIAS_OPTIONS = [
  { value: 'ASCENDENTE', label: 'Ascendente' },
  { value: 'DESCENDENTE', label: 'Descendente' },
  { value: 'NO APLICA', label: 'No aplica' }
];

const MoreInformation = () => {
  const { control, getValues } = useFormContext();
  const { temas } = useTemas({ activo: true });
  const { objetivos } = useObjetivos();
  const { resources: ods } = useResourceList({ resource: 'ods' });
  const { resources: coberturas } = useResourceList({ resource: 'coberturas' });

  return (
    <Grid item xs={12} md={6} sx={{
      p: 1,
      height: '100%',
    }}>
      <Stack gap={2} sx={{ p: 1, backgroundColor: 'white' }}>
        <Typography variant='h5' mb={2}>Más información</Typography>
        <Controller
          control={control}
          name='tendenciaActual'
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              select
              label="Tendencia Actual"
              fullWidth
              error={!!error}
              helperText={error ? error.message : ''}
              value={field.value ? field.value.toUpperCase() : ''}
            // --------------------------
            >
              {TENDENCIAS_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Controller
          control={control}
          name='temas'
          render={({ field: { value, onChange } }) => (
            <Autocomplete
              multiple
              value={value || []}
              options={temas}
              getOptionLabel={(option) => option.temaIndicador || ''}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(_, data) => {
                const lastSelected = data.length > 0 ? [data[data.length - 1]] : [];
                onChange(lastSelected);
              }}
              id='temas'
              renderInput={(params) => <TextField {...params} label='Temas' />}
            />
          )}
        />
        <Controller
          control={control}
          name='cobertura'
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            < Autocomplete
              value={value}
              options={coberturas}
              getOptionLabel={(option) => option.tipo}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(_, data) => onChange(data)}
              id='coberturas'
              renderInput={(params) => <TextField {...params} label='Cobertura geográfica' />}
            />
          )}
        />
        <Controller
          control={control}
          name='ods'
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Autocomplete
              value={value}
              options={ods}
              getOptionLabel={(option) => `${option.id}. ${option.titulo}`}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(_, data) => onChange(data)}
              id='ods'
              renderInput={(params) => <TextField {...params} label='Objetivo de Desarrollo Sostenible' />}
            />
          )}
        />
        <Controller
          control={control}
          name='objetivos'
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Autocomplete
              value={value}
              options={objetivos}
              getOptionLabel={(option) => option.titulo}
              multiple
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(_, data) => onChange(data)}
              id='objetivos'
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Objetivos del PDU2040'
                  helperText={error ? error.message : ''}
                />)}
            />
          )}
        />
        <Controller
          control={control}
          name='meses'
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Autocomplete
              multiple
              id='meses'
              options={MESES_OPTIONS}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, val) => option.value === val.value}
              value={Array.isArray(value)
                ? value.map(v => MESES_OPTIONS.find(op => op.value === v) || v)
                : []
              }
              onChange={(_, data) => onChange(data.map(d => d.value))}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Meses de actualización'
                  placeholder='Selecciona meses'
                  error={!!error}
                  helperText={error ? error.message : ''}
                />
              )}
            />
          )}
        />

      </Stack>
    </Grid>
  )
}

export default MoreInformation