import {
  Autocomplete,
  Box, Grid, TextField, Typography,
} from "@mui/material";
import { useCallback, useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useIndicadorContext } from "../../../../contexts/IndicadorContext";
import { CatalogoAutocomplete } from "../../common/CatalogPicker";
import AutoCompleteInput from "../../../common/AutoCompleteInput";
import { getTemas } from "../../../../services/temaService";
import { getObjetivosGeneralInfo } from "../../../../services/dimensionService";

const indicadorBasicSchema = yup.object({
  nombre: yup.string().required('Ingresa el nombre'),
  codigo: yup.string().required('Ingresa el código'),
  definicion: yup.string().required('Ingresa la definición'),
  ultimoValorDisponible: yup.string().required('Ingresa el último valor disponible'),
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
  tema: yup.object({
    id: yup.number(),
    temaIndicador: yup.string()
  }).nullable().required('Selecciona un tema'),
  objetivo: yup.object({
    id: yup.number(),
    titulo: yup.string()
  }).nullable().required('Selecciona una dimensión')
})

export const FormBasic = () => {
  const { indicador, onSubmit } = useIndicadorContext();
  const methods = useForm({
    resolver: yupResolver(indicadorBasicSchema)
  });
  const { control, reset, handleSubmit, setValue } = methods;
  const selectedTema = useWatch({ control, name: 'tema' });

  useEffect(() => {
    if (!selectedTema) {
      setValue('codigo', '');
      return;
    }
    const { codigo, indicadoresCount } = selectedTema;
    const count = (parseInt(indicadoresCount) + 1).toString();
    setValue('codigo', `${codigo}${count.padStart(3, '0')}`, { shouldValidate: true });
  }, [selectedTema]);

  const initForm = useCallback(() => {
    if (indicador.nombre === '') {
      return;
    }
    reset(indicador);
  }, [indicador]);

  useEffect(() => {
    initForm();
  }, [initForm])

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
        <Grid item xs={6}>
          <Controller
            control={control}
            name='objetivo'
            defaultValue={null}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <AutoCompleteInput
                value={value}
                onChange={onChange}
                error={error}
                label='Dimensión'
                helperText='Objetivo de PDU'
                getOptionLabel={item => item.titulo}
                fetcher={async () => {
                  const res = await getObjetivosGeneralInfo()
                  return res.data.data
                }}
                required
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
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
                fetcher={getTemas}
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
            defaultValue=''
            control={control}
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
                helperText={error ? error.message : value ? 'Código recomendado' : null}
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