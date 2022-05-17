import React from 'react';
import { Grid, IconButton, TextField, Autocomplete } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Controller, useFormContext } from 'react-hook-form';

const options = ['option 1', 'option 2']

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
        anio: getValues('anio')
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
        justifyContent: 'space-evenly',
        gap: 1
      }}
    >
      <Grid item xs>
        <Controller
          control={methods.control}
          name={`variables[${index}].nombre`}
          defaultValue=''
          render={({
            field: { onChange, value }
          }) => (
            <TextField
              label='Variable'
              placeholder='x'
              onChange={onChange}
              value={value}
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
            field: { onChange, value }
          }) => (
            <TextField
              label='Dato'
              placeholder='123'
              onChange={onChange}
              value={value}
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
            field: { onChange, value }
          }) => (
            <TextField
              label='Año'
              placeholder={'2022'}
              onChange={onChange}
              value={value}
            />
          )}
        />
      </Grid>
      <Grid item xs={3}>
        <Autocomplete
          options={options}
          renderInput={(params) => <TextField {...params} label="Unidad Medida" />}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          name='nombreAtributo'
          label='Descripcion'
          placeholder='Lorem ipsum'
          multiline
          fullWidth
        />
      </Grid>
      <Grid item xs={1} alignSelf='center'>
        <IconButton
          onClick={handleOnClick}
          color='primary'
        >
          {
            addVariable ? <AddIcon /> : <RemoveIcon />
          }
        </IconButton>
      </Grid>
    </Grid >
  );
}