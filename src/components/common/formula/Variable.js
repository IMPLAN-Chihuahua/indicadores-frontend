import React from 'react';
import { Grid, IconButton, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Controller, useFormContext } from 'react-hook-form';
import AutoCompleteInput from '../AutoCompleteInput';

export const Variable = (props) => {
  const methods = useFormContext();

  const { getValues } = methods;
  const { index } = props;
  const { addVariable, deleteVariable } = props;

  const handleOnClick = () => {
    if (addVariable) {
      const newVariable = {
        nombre: getValues('nombre'),
        dato: getValues('dato'),
        anio: getValues('anio'),
        variableDesc: getValues('variableDesc'),
        medida: getValues('medida'),
      }
      addVariable(newVariable);
    } else if (deleteVariable) {
      deleteVariable(props.index);
    }
  }

  return (
    <Grid
      container
      sx={{
        borderRadius: 5,
        alignItems: 'self-start',
        justifyContent: 'center',
        gap: 1
      }}
    >
      <Grid item xs>
        <Controller
          control={methods.control}
          name={`variables[${index}].nombre`}
          defaultValue=''
          render={({
            field, fieldState: { error }
          }) => (
            <TextField
              label='Variable'
              fullWidth
              error={!!error}
              helperText={error ? error.message : null}
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item xs={2}>
        <Controller
          control={methods.control}
          name={`variables[${index}].dato`}
          defaultValue=''
          render={({
            field
          }) => (
            <TextField
              label='Dato'
              fullWidth
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item xs={1}>
        <Controller
          control={methods.control}
          name={`variables[${index}].anio`}
          defaultValue=''
          render={({
            field, fieldState: { error }
          }) => (
            <TextField
              label='Año'
              error={!!error}
              helperText={error ? error.message : null}
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item xs={3}>
        <Controller
          control={methods.control}
          name={`variables[${index}].variableDesc`}
          defaultValue=''
          render={({
            field: { value, onChange }
          }) => (
            <TextField
              label='Descripción'
              multiline
              value={value}
              onChange={onChange}
            />
          )}
        />
      </Grid>
      <Grid item xs={2}>
        <Controller
          name={`variables[${index}].medida`}
          control={methods.control}
          defaultValue={null}
          render={({
            field: { value, onChange },
            fieldState: { error }
          }) => (
            <AutoCompleteInput
              value={value}
              onChange={onChange}
              error={error}
              label='Unidad de medida'
              getOptionLabel={(item) => item.nombre}
              opts={props.medidaOptions}
            />
          )}
        />
      </Grid>
      <Grid item xs={1} alignSelf='center'>
        <IconButton
          onClick={handleOnClick}
          color='primary'
          sx={{ backgroundColor: 'aliceBlue' }}
        >
          {
            addVariable ? <AddIcon /> : <RemoveIcon />
          }
        </IconButton>
      </Grid>
    </Grid>
  );
}