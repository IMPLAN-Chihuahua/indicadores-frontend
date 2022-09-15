import {
  Autocomplete,
  Box, Grid, TextField, Typography,
} from "@mui/material";
import { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useIndicadorContext } from "../../../../contexts/IndicadorContext";
import { CatalogoAutocomplete } from "../../common/CatalogPicker";
import AutoCompleteInput from "../../../common/AutoCompleteInput";
import { getTemas } from "../../../../services/moduleService";

const indicadorBasicSchema = yup.object({
  nombre: yup.string().required('Ingresa el nombre'),
  codigo: yup.string().required('Ingresa el código'),
  definicion: yup.string().required('Ingresa la definición'),
  ultimoValorDisponible: yup.string().required('Ingresa el último valor disponible'),
  anioUltimoValorDisponible: yup.number().typeError('Ingresa una valor válido').required('Ingresa el año del último valor disponible'),
  medida: yup.object({
    id: yup.number(),
    unidad: yup.string()
  }).nullable(),
  ods: yup.object({
    id: yup.number(),
    unidad: yup.string()
  }).nullable(),
  cobertura: yup.object({
    id: yup.number(),
    unidad: yup.string()
  }).nullable(),
  tema: yup.object({
    id: yup.number(),
    temaIndicador: yup.string()
  }).nullable().required('Selecciona un tema')
})

const ODS_ID = 1;
const UNIDAD_MEDIDA_ID = 2;
const COBERTURA_ID = 3;

export const FormBasic = () => {
  const { indicador, onSubmit } = useIndicadorContext();
  const methods = useForm({
    resolver: yupResolver(indicadorBasicSchema)
  });
  const { control, reset, handleSubmit } = methods;

  const initForm = useCallback(() => {
    if (indicador.nombre === '') {
      return;
    }
    reset(indicador);
  }, [indicador]);

  const temasFetcher = async () => {
    let temas = await getTemas();
    temas = temas.map(({ id, temaIndicador }) => ({ id, temaIndicador }))
    return temas;
  };

  useEffect(() => {
    initForm();
    temasFetcher();
  }, [])

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
          <Typography variant='h6'>General</Typography>
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            name='tema'
            defaultValue={null}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <AutoCompleteInput
                value={value}
                onChange={onChange}
                error={error}
                label='Tema de interes'
                helperText='Tema al que pertenece el indicador'
                getOptionLabel={(item) => item.temaIndicador}
                fetcher={temasFetcher}
                required
              />
            )}
          />
        </Grid>
        <Grid item xs={8}>
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
        <Grid item xs={4}>
          <Controller
            name="codigo"
            control={control}
            defaultValue=''
            render={({
              field: { onChange, value },
              fieldState: { error }
            }) => (
              <TextField
                label='Codigo'
                type='text'
                required
                placeholder='DRY'
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
        <Grid item xs={3}>
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
        <Grid item xs={3}>
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
                helperText={error?.message}
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

        <Grid item xs={12}>
          <Typography variant='h6'>Características</Typography>
        </Grid>
        <Grid item xs={4}>
          <Controller
            name="medida"
            control={control}
            defaultValue={null}
            render={({
              field: { value, onChange },
              fieldState: { error }
            }) => (
              <CatalogoAutocomplete
                id={UNIDAD_MEDIDA_ID}
                value={value}
                onChange={onChange}
                label="Unidad Medida"
                error={error}
                required={false}
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            name="cobertura"
            control={control}
            defaultValue={null}
            render={({
              field: { value, onChange },
              fieldState: { error }
            }) => (
              <CatalogoAutocomplete
                id={COBERTURA_ID}
                value={value}
                onChange={onChange}
                label="Cobertura Geográfica"
                error={error}
                required={false}
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            name="ods"
            control={control}
            defaultValue={null}
            render={({
              field: { value, onChange },
              fieldState: { error }
            }) => (
              <CatalogoAutocomplete
                id={ODS_ID}
                value={value}
                onChange={onChange}
                label="Objetivo de Desarrollo Sostenible"
                error={error}
                required={false}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};