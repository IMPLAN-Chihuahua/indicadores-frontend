import { Alert, Box, Grid, Stack, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useIndicadorContext } from "../../../../contexts/IndicadorContext";
import { ImageInput } from "../../../common/FileInput";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

const mapaSchema = yup.object({
  url: yup.string().url('Ingresa una URL valida'),
})

export const defaultMapa = {
  url: '',
  ubicacion: '',
  urlImagen: null,
};

export const FormMapa = (props) => {
  const { indicador, onSubmit } = useIndicadorContext();
  const methods = useForm({
    resolver: yupResolver(mapaSchema)
  });
  const { handleSubmit, reset, control } = methods;

  useEffect(() => {
    reset(indicador.mapa);
  }, [indicador.mapa]);

  return (
    <FormProvider {...methods}>
      <Box
        id='form-mapa'
        component='form'
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid
          container
          rowSpacing={2}
          columnSpacing={2}
        >
          {
            props.defaultTitle && (
              <Grid item xs={12}>
                <Typography variant='h5' component='h3'>Mapa</Typography>
              </Grid>
            )
          }
          <Grid item xs={12}>
            <Controller
              control={control}
              name='url'
              defaultValue=''
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                  label='URL ArcGIS'
                  placeholder="https://geoportal.implanchihuahua.org"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={control}
              name='ubicacion'
              defaultValue=''
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                  label='Ubicación'
                  placeholder="G:\datos\PDU_2040\zonificacion_primaria"
                />
              )}
            />
          </Grid>
          <Grid item xs>
            <ImageInput
              name='urlImagen'
              label='Imagen del mapa'
              height='300px'
            />
            <Alert
              severity="info"
              style={{ maxWidth: 'fit-content', marginTop: '5px' }}>
              Esta imagen será utilizada en el archivo PDF de la ficha técnica.
            </Alert>
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  );
};