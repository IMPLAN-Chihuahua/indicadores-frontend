import { Box, Button, DialogActions, DialogContent, Grid, TextField } from "@mui/material";
import { Controller, FormProvider, useForm } from "react-hook-form";
import FileInput from "../../../common/FileInput";

export const FormMapa = ({ handleBack, handleNext }) => {
  const methods = useForm();
  const { control, handleSubmit, reset } = methods;
  const onSubmit = data => {
    console.log(data)
    handleNext();
  }

  return (
    <>
      <DialogContent style={{ height: '60vh' }}>
        <FormProvider {...methods}>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            onReset={reset}
          >
            <Grid container rowSpacing={2}>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  name='url'
                  render={() => (
                    <TextField
                      fullWidth
                      label='URL del mapa'
                      placeholder="https://geoportal.implanchihuahua.org"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FileInput
                  name='imgMapa'
                  label='Imagen del mapa'
                  height='300px'
                />
              </Grid>
            </Grid>
          </Box>
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleBack}>Atras</Button>
        <Button variant='contained' onClick={handleSubmit(onSubmit)}>Siguiente</Button>
      </DialogActions>
    </>
  );
};