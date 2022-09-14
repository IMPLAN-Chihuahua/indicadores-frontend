import { Box, Checkbox, FormControlLabel, FormGroup, Grid, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useIndicadorContext } from "../../../../contexts/IndicadorContext";
import FileInput, { ImageInput } from "../../../common/FileInput";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

const mapaSchema = yup.object({
  url: yup.string().url('Ingresa una URL valida'),
})

export const FormMapa = () => {
  const { indicador, onSubmit } = useIndicadorContext();
  const methods = useForm({
    resolver: yupResolver(mapaSchema)
  });
  const { handleSubmit, reset, control } = methods;

  useEffect(() => {
    reset(indicador.mapa);
  }, []);

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
          <Grid item xs={12}>
            <Typography variant='h5' component='h3'>Mapa</Typography>
          </Grid>
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
              name='hasMapa'
              defaultValue={false}
              render={({ field: { value, onChange } }) => (
                <FormGroup>
                  <FormControlLabel
                    label='Indicador cuenta con cartografía'
                    control={<Checkbox onChange={onChange} checked={value} />}
                  />
                </FormGroup>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <ImageInput
              name='image'
              label='Imagen del mapa'
              height='300px'
            />
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  );
};