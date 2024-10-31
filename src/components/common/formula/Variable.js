import React from 'react';
import { Grid, IconButton, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Controller, useFormContext } from 'react-hook-form';
import AutoCompleteInput from '../AutoCompleteInput';

export const VARIABLE_MODES = {
  SINGLE: 'single',
  MULTIPLE: 'multiple'
}

export const Variable = (props) => {
  const methods = useFormContext();

  const { getValues } = methods;
  const { index, mode } = props;
  const { addVariable, deleteVariable } = props || null;

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

  const isSingleMode = mode === VARIABLE_MODES.SINGLE;

  return (
    <Grid
      container
      direction={isSingleMode ? 'column' : 'row'}
      sx={{
        alignItems: 'stretch',
        justifyContent: 'center',
        gap: isSingleMode ? 2 : 1
      }}
    >
      <Grid item xs>
        <Controller
          control={methods.control}
          name={isSingleMode ? 'nombre' : `variables.${index}.nombre`}
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
          name={isSingleMode ? 'dato' : `variables.${index}.dato`}
          render={({
            field, fieldState: { error }
          }) => (
            <TextField
              label='Dato'
              fullWidth
              error={!!error}
              helperText={error ? error.message : null}
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item xs={1}>
        <Controller
          control={methods.control}
          name={isSingleMode ? 'anio' : `variables.${index}.anio`}
          render={({
            field, fieldState: { error }
          }) => (
            <TextField
              label='Año'
              error={!!error}
              helperText={error ? error.message : null}
              fullWidth
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item xs={3}>
        <Controller
          control={methods.control}
          name={isSingleMode ? 'variableDesc' : `variables.${index}.variableDesc`}
          render={({
            field: { value, onChange }
          }) => (
            <TextField
              label='Descripción'
              multiline
              fullWidth
              value={value}
              onChange={onChange}
              maxRows={4}
            />
          )}
        />
      </Grid>
      <Grid item xs>
        <Controller
          name={isSingleMode ? 'medida' : `variables.${index}.medida`}
          control={methods.control}
          render={({
            field: { value, onChange },
            fieldState: { error }
          }) => (
            <TextField
              label='Unidad de medida'
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : ''}
            />
          )}
        />
      </Grid>
      {(addVariable || deleteVariable) && (
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
      )}
    </Grid>
  );
}