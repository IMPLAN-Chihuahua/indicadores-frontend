import {
  Autocomplete,
  Box, Grid, TextField,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useIndicadorContext } from "../../../../contexts/IndicadorContext";
import { useTemas } from "../../../../services/temaService";
import { useObjetivos } from "../../../../services/objetivoService";


export const FormBasic = () => {
  const { indicador, onSubmit } = useIndicadorContext();
  const methods = useForm({
    resolver: yupResolver(indicadorBasicSchema)
  });
  const { control, reset, handleSubmit } = methods;
  const { objetivos, isLoading: isObjetivosLoading } = useObjetivos();
  const { temas, isLoading: isTemasLoading } = useTemas();

  useEffect(() => {
    if (indicador.nombre === '') return;

    reset(indicador);
  }, [indicador])

  return (
    <Box
      id='form-basic'
      component='form'
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid
        container
        columnSpacing={2}
        rowSpacing={2}
        direction="row"
      >
        <Grid item xs={12}>
          <Controller
            name="nombre"
            control={control}
            defaultValue=''
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
                helperText={error?.message}
                onChange={onChange}
                value={value}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name='objetivo'
            defaultValue={null}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Autocomplete
                value={value}
                onChange={(_, data) => onChange(data)}
                options={objetivos}
                loading={isObjetivosLoading}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={option => option.titulo}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Objetivo de PDU'
                    variant='outlined'
                    required
                    error={!!error}
                    placeholder="Selecciona un objetivo"
                    helperText={error ? error.message : ''}
                  />
                )}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name='temas'
            defaultValue={[]}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Autocomplete
                value={value}
                onChange={(_, data) => onChange(data)}
                multiple
                options={temas}
                loading={isTemasLoading}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={option => option.temaIndicador}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant='outlined'
                    required
                    placeholder="Selecciona al menos un tema"
                    error={!!error}
                    helperText={error ? error.message : ''}
                    label='Temas de interés'
                  />
                )}
              />
            )}
          />
        </Grid>

        <Grid item xs={8} md={4}>
          <Controller
            name="ultimoValorDisponible"
            control={control}
            defaultValue=''
            render={({
              field: { onChange, value },
              fieldState: { error }
            }) => (
              <TextField
                label='Último valor disponible'
                type='text'
                required
                error={!!error}
                helperText={error?.message}
                onChange={onChange}
                value={value}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={4} md={2}>
          <Controller
            name="adornment"
            control={control}
            defaultValue=''
            render={({
              field: { onChange, value },
              fieldState: { error }
            }) => (
              <TextField
                label='Simbolo'
                type='text'
                error={!!error}
                helperText={error?.message}
                onChange={onChange}
                value={value}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <Controller
            name="anioUltimoValorDisponible"
            control={control}
            defaultValue=''
            render={({
              field: { onChange, value },
              fieldState: { error }
            }) => (
              <TextField
                label='Año último valor disponible'
                type='text'
                required
                placeholder={new Date().getFullYear().toString()}
                error={!!error}
                helperText={error?.message}
                onChange={onChange}
                value={value}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={6} md={3}>
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
        <Grid item xs={12}>
          <Controller
            name="definicion"
            defaultValue=''
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
  );
};


const indicadorBasicSchema = yup.object({
  nombre: yup.string().required('Ingresa el nombre'),
  objetivo: yup.object({
    id: yup.number(),
    titulo: yup.string()
  }).typeError('Selecciona un objetivo'),
  temas: yup.array().of(yup.object({
    id: yup.number(),
    temaIndicador: yup.string()
  })).min(1, 'Selecciona un tema'),
  ultimoValorDisponible: yup.string().required('Ingresa el último valor disponible'),
  adornment: yup.string().trim(),
  definicion: yup.string().required('Ingresa la definición'),
  anioUltimoValorDisponible: yup
    .number().typeError('Ingresa una valor válido')
    .required('Ingresa el año del último valor disponible')
    .positive('El año debe ser positivo')
    .integer('El año debe ser un número entero')
    .max(new Date().getFullYear(), 'El año no puede ser mayor que el actual')
  ,
  periodicidad: yup.number()
    .integer()
    .typeError('Periodicidad debe ser un número')
    .min(0)
    .nullable(),
})