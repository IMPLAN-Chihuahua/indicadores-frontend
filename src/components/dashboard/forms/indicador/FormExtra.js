import {
  Box, Button, Grid,
  TextField, DialogContent, DialogActions
} from "@mui/material";
import { Controller, FormProvider, useForm } from "react-hook-form";
import FileInput from "../../../common/FileInput";

export const FormExtra = () => {
  const methods = useForm();
  const { handleSubmit, control } = methods;
  const onSubmit = data => {

  }

  return (
    <FormProvider {...methods}>
      <Box
        component='form'
        noValidate
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
  );
};