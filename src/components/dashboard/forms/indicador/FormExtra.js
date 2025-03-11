import {
  Autocomplete,
  Box, Grid,
  TextField, Typography
} from "@mui/material";
import { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useIndicadorContext } from "../../../../contexts/IndicadorContext";
import { useResourceList } from "../../../../hooks/useResourceList";

export const FormExtra = () => {
  const { indicador, onSubmit } = useIndicadorContext();

  const methods = useForm();
  const { handleSubmit, control, reset } = methods;
  const { resources: coberturas, isLoading: isCoberturasLoading } = useResourceList({ resource: 'coberturas' });

  useEffect(() => {
    reset(indicador)
  }, [indicador]);

  return (
    <FormProvider {...methods}>
      <Box
        id='form-extra'
        component='form'
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid
          container
          columnSpacing={2}
          rowSpacing={2}
        >
          <Grid item xs={12}>
            <Controller
              control={control}
              name='observaciones'
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  value={value}
                  onChange={onChange}
                  label='Observaciones'
                  multiline
                  rows={2}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={control}
              name='fuente'
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  value={value}
                  onChange={onChange}
                  label='Fuente'
                  multiline
                  rows={2}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="periodicidad"
              control={control}
              defaultValue=''
              render={({
                field: { onChange, value },
                fieldState: { error }
              }) => (
                <TextField
                  label='Periodicidad en meses'
                  type='text'
                  placeholder='Tiempo entre actualizaciones'
                  error={!!error}
                  helperText={error && error.message}
                  onChange={onChange}
                  value={value}
                  fullWidth
                />
              )}
            />
          </Grid>


          <Grid item xs={6}>
            <Controller
              name="cobertura"
              control={control}
              defaultValue={null}
              render={({
                field: { value, onChange },
                fieldState: { error }
              }) => (
                <Autocomplete
                  value={value}
                  onChange={(_, data) => onChange(data)}
                  options={coberturas}
                  loading={isCoberturasLoading}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  getOptionLabel={option => option.tipo}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant='outlined'
                      required
                      error={!!error}
                      helperText={error ? error.message : ''}
                      label='Cobertura geográfica'
                    />
                  )}
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  );
};