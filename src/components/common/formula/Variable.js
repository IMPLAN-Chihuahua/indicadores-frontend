import React from 'react';
import { Grid, IconButton, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Controller, useFormContext } from 'react-hook-form';
import { CatalogoAutocomplete } from '../../dashboard/common/CatalogPicker';

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
            field
          }) => (
            <TextField
              label='Variable'
              fullWidth
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
            field
          }) => (
            <TextField
              label='Año'
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item xs={3}>
        <Controller
          control={methods.control}
          name={`variables[${index}].nombreAtributo`}
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
            <CatalogoAutocomplete
              id={2}
              value={value}
              onChange={onChange}
              label="Unidad Medida"
              error={error}
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
    </Grid >
  );
}