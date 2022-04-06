import {
  Autocomplete, Box,
  Grid, TextField, Button, DialogContent, DialogActions
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { addBasicData } from "../../../../features/indicador/indicadorSlice";

const indicadorBasicSchema = yup.object({
  nombre: yup.string().required('Por favor, ingrese el nombre'),
  codigo: yup.string().required('Por favor, ingrese el código'),
  definicion: yup.string().required('Por favor, ingrese la definición'),
  medida: yup.object({
    id: yup.number(),
    unidad: yup.string()
  }).nullable().required('Por favor, seleccione una unidad')
})

export const FormIndicador = ({ handleNext }) => {
  const basicFormData = useSelector((state) => state.indicadores.basic)
  const methods = useForm({ resolver: yupResolver(indicadorBasicSchema) });
  let dummyOptions = [{ id: 1, unidad: 'u-1' }, { id: 2, unidad: 'u-2' }];
  const { control, reset, handleSubmit } = methods;
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(addBasicData(data));
    handleNext();
  }

  useEffect(() => {
    if (Object.keys(basicFormData).length > 0) {
      reset(basicFormData);
    }
  }, [])

  return (
    <>
      <DialogContent style={{ height: '60vh' }}>
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
                    placeholder='123'
                    error={!!error}
                    helperText={error ? error.message : null}
                    onChange={onChange}
                    value={value}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="medida"
                control={control}
                defaultValue={null}
                render={({ field: props, fieldState: { error } }) => (
                  <Autocomplete
                    {...props}
                    autoHighlight
                    options={dummyOptions}
                    getOptionLabel={option => option.unidad}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onChange={(_, data) => props.onChange(data)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Unidad Medida"
                        error={!!error}
                        helperText={error?.message}
                        required
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                options={['dummyOptions']}
                renderInput={(params) => <TextField {...params} required label="Cobertura Geografica" />}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                options={['something']}
                renderInput={(params) => <TextField {...params} label="Objetivo de Desarrollo Sostenible" />}
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
      </DialogContent>
      <DialogActions>
        <Button disabled>Atras</Button>
        <Button variant='contained' onClick={handleSubmit(onSubmit)}>Siguiente</Button>
      </DialogActions>
    </>
  );
};