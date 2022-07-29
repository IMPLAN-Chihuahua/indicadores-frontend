import { Box, Grid, TextField } from "@mui/material";
import { Controller, FormProvider, useForm } from "react-hook-form";
import FileInput from "../../../common/FileInput";

export const FormMapa = () => {
  const methods = useForm();
  const { handleSubmit, reset } = methods;
  const onSubmit = data => {
    console.log(data)
  }

  return (
    <FormProvider {...methods}>
      <Box
        component='form'
        noValidate
        onReset={reset}
      >
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid item xs={12}>
            <Controller
              control={methods.control}
              name='url'
              defaultValue=''
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='URL del mapa'
                  placeholder="https://geoportal.implanchihuahua.org"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <FileInput
              name='image'
              accept='image/png, image/jpg, image/jpeg, image/gif'
              type='map'
              label='Imagen del mapa'
              height='100px'
            />
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  );
};