import { Autocomplete, Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

export const FormIndicador = ({ formContent }) => {
  const methods = useFormContext();
  const { control, reset } = methods;

  useEffect(() => {
    reset({ ...formContent.indicador }, { keepErrors: true })
  }, []);

  return (
    <>
      <Box
        component='form'
        noValidate
      >
        <Grid
          container
          columnSpacing={2}
          rowSpacing={2}
          direction="row"
          xs={6}
        >
          <Grid item xs={12} >
            <Typography variant="subtitle1" component="h4">
              General
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="nombre"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error }
              }) => (
                <TextField
                  label='Nombre'
                  type='text'
                  required
                  placeholder='Almacen de carbono'
                  error={!!error}
                  helperText={error ? error.message : null}
                  onChange={onChange}
                  value={value}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="codigo"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error }
              }) => (
                <TextField
                  label='Codigo'
                  type='text'
                  required
                  placeholder='123'
                  error={!!error}
                  helperText={error ? error.message : null}
                  onChange={onChange}
                  value={value}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="codigoObjeto"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error }
              }) => (
                <TextField
                  label='Codigo Objeto'
                  type='text'
                  required
                  placeholder='123'
                  error={!!error}
                  helperText={error ? error.message : null}
                  onChange={onChange}
                  value={value}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              options={['something', 'something 2']}
              renderInput={(params) => <TextField {...params} required label="Unidad Medida" />}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              options={['something']}
              renderInput={(params) => <TextField {...params} required label="Cobertura Geografica" />}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name='tendenciaDeseada'
              control={control}
              render={({ field, fieldState: { error } }) => (
                <FormControl fullWidth>
                  <InputLabel
                    id='tendencia-deseada-label'
                    error={!!error}
                    htmlFor='tendencia-deseada'
                  >
                    Tendencia Deseada
                  </InputLabel>
                  <Select
                    id='tendencia-deseada'
                    labelId='tendencia-deseada-label'
                    label='Tendencia Deseada'
                    error={!!error}
                    {...field}
                  >
                    <MenuItem value='NA'>No aplica</MenuItem>
                    <MenuItem value='ascendente'>Ascendente</MenuItem>
                    <MenuItem value='descendente'>Descendente</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              options={['something']}
              renderInput={(params) => <TextField {...params} label="Objetivo de Desarrollo Sostenible" />}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="definicion"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error }
              }) => (
                <TextField
                  label='Definicion'
                  type='text'
                  multiline
                  required
                  rows={3}
                  onChange={onChange}
                  value={value}
                  error={!!error}
                  helperText={error ? error.message : null}
                  fullWidth
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

/**
 * - Add ultimo valor disponible?
 * - Add tendenciaDeseada
 * - Add observaciones
 * - Add catalogo references (ods, cobertura geografica, unidad medida)
 */