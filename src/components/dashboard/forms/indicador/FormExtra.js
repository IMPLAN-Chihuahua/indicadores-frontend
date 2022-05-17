import {
  Box, Button, Grid,
  TextField, DialogContent, DialogActions
} from "@mui/material";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import FileInput from "../../../common/FileInput";

export const FormExtra = ({ handleBack }) => {
  const formIndicadorData = useSelector((state) => state.indicadores);
  const methods = useForm();
  const { handleSubmit, control } = methods;
  const onSubmit = data => {
    console.log(data)
  }
  return (
    <>
      <DialogContent style={{ height: '60vh' }}>
        <FormProvider {...methods}>

          <Box
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
                      rows={3}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FileInput
                  name="imgIndicador"
                  label="Subir Archivo"
                  height='300px'
                />
              </Grid>
            </Grid>

          </Box>
        </FormProvider>
        <pre>
          {JSON.stringify(formIndicadorData, null, 2)}
        </pre>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleBack}>Atras</Button>
        <Button variant='contained' onClick={handleSubmit(onSubmit)}>Terminar</Button>
      </DialogActions>
    </>
  );
};