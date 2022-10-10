import {
  Box, Grid,
  TextField, Typography
} from "@mui/material";
import { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useIndicadorContext } from "../../../../contexts/IndicadorContext";

export const FormExtra = () => {
  const { indicador, onSubmit } = useIndicadorContext();
  const methods = useForm();
  const { handleSubmit, control, reset } = methods;

  const initForm = () => {
    reset(indicador)
  }

  useEffect(() => {
    initForm();
  }, []);

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
            <Typography variant='h5' component='h3'>Más Información</Typography>
          </Grid>
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
        </Grid>
      </Box>
    </FormProvider>
  );
};