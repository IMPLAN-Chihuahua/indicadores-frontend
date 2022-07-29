import {
  Box, Grid, TextField, Button, Typography,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup';
import { useIndicador } from "../../../../contexts/IndicadorContext";
import { CatalogoAutocomplete } from "../../common/CatalogPicker";

const indicadorBasicSchema = yup.object({
  nombre: yup.string().required('Por favor, ingrese el nombre'),
  codigo: yup.string().required('Por favor, ingrese el código'),
  definicion: yup.string().required('Por favor, ingrese la definición'),
  medida: yup.object({
    id: yup.number(),
    unidad: yup.string()
  }).nullable().required('Por favor, seleccione una unidad')
})

const ODS_ID = 1;
const UNIDAD_MEDIDA_ID = 2;
const COBERTURA_ID = 3;

export const FormBasic = () => {
  const { indicador, dispatch } = useIndicador();
  const methods = useForm();
  const { control, reset, handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log(data)
  }

  useEffect(() => {
    console.log(indicador.basic);
  }, []);

  return (
    <Box
      component='form'
      noValidate
    >
      <Grid
        container
        columnSpacing={2}
        rowSpacing={2}
        direction="row"
      >
        <Grid item xs={12}>
          <Typography variant='h5' component='h3'>General</Typography>
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
                type='number'
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
        <Grid item xs={6}>
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
                placeholder={new Date().getFullYear()}
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
          <Typography variant='h5' component='h3'>Características</Typography>
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
                required={true}
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
                required={true}
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