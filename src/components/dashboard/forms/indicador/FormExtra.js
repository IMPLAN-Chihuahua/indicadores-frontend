import {
  Box, Button, Grid,
  TextField, DialogContent, DialogActions
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

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
        <Box
          component='form'
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container>
            <Grid item>
              <Controller
                control={control}
                name='observaciones'
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    label='Observaciones'
                    multiline
                  />
                )}
              />
            </Grid>
          </Grid>

        </Box>
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