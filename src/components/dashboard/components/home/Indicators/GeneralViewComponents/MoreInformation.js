import React from 'react'
import '../indicator.css'
import {
  Grid, TextField,
  Typography, Stack,
  Autocomplete,
} from '@mui/material';
import { Controller, FormProvider, useForm, useFormContext, useWatch } from 'react-hook-form';
import { useResourceList } from '../../../../../../hooks/useResourceList';
import { useObjetivos } from '../../../../../../services/objetivoService';
import { useTemas } from '../../../../../../services/temaService';


const MoreInformation = () => {
  const { control, getValues } = useFormContext();
  const { temas } = useTemas();
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
          name='temas'
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Autocomplete
              value={value}
              options={temas}
              getOptionLabel={(option) => option.temaIndicador}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(_, data) => onChange(data)}
              multiple
              id='temas'
              renderInput={(params) => <TextField {...params} label='Temas' />}
            />
          )}
        />
        <Controller
          control={control}
          name='cobertura'
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Autocomplete
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
              getOptionLabel={(option) => option.titulo}
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
      </Stack>
    </Grid>
  )
}

export default MoreInformation