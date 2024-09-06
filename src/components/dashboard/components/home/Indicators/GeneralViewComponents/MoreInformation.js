import React, { useEffect } from 'react'
import '../indicator.css'
import {
  Grid, TextField,
  Typography, Box, Stack,
  Paper, Link as MUILink,
  Autocomplete
} from '@mui/material';
import OwnerListDropdown from '../Owner/OwnerList';
import { CatalogoAutocomplete } from '../../../../common/CatalogPicker';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useAuth } from '../../../../../../contexts/AuthContext';
import { displayLabel } from '../../../../../../utils/getCatalog';
import ODSTable from '../ODS/ODSTable';
import { getTemas } from '../../../../../../services/temaService';
import { getObjetivosGeneralInfo } from '../../../../../../services/dimensionService';

const getTemasRes = async () => {
  const temas = await getTemas();
  return temas;
};

const getObjetivos = async () => {
  const { data } = await getObjetivosGeneralInfo();
  return data;
}

const MoreInformation = ({ methods, id }) => {
  const { user } = useAuth();
  const [temasRes, setTemas] = React.useState([]);
  const [objetivos, setObjetivos] = React.useState([]);

  const temas = methods.watch('temas');


  useEffect(() => {
    getTemasRes().then(temas => {
      setTemas(temas);
    })

    getObjetivos().then(objetivos => {
      setObjetivos(objetivos);
    })

  }, [])

  console.log(objetivos);

  return (
    <Grid item xs={12} md={6} sx={{
      p: 1,
      height: '100%',
    }}>
      <Stack gap={2} sx={{ p: 1, backgroundColor: 'white', height: '100%' }}>
        <Typography variant='h5' mb={2}>Más información</Typography>
        <Controller
          control={methods.control}
          name='temas'
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Autocomplete
              value={value}
              options={temasRes}
              getOptionLabel={(option) => option.temaIndicador}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(_, data) => onChange(data)}
              multiple
              id='temas'
              renderInput={(params) => <TextField {...params} label='Temas' />}
            />
          )}
        />
        <Controller
          control={methods.control}
          name='objetivos'
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Autocomplete
              value={value}
              options={objetivos}
              getOptionLabel={(option) => option.titulo}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(_, data) => onChange(data)}
              multiple
              id='Objetivos'
              renderInput={(params) => <TextField {...params} label='Objetivos del PDU2040' />}
            />
          )}
        />


        {/* <Autocomplete
          multiple
          id='temas'
          options={temasArray}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              variant='outlined'
              label="Temáticas de interés"
              placeholder='Selecciona los temas de interés'
            />
          )}
        /> */}

        {/* <Autocomplete
          multiple
          id='objetivos'
          options={temasArray}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              variant='outlined'
              label="Objetivos del PDU2040"
              placeholder='Selecciona los objetivos a los que pertenece este indicador'
            />
          )}
        /> */}

        <ODSTable />
      </Stack>
    </Grid>
  )
}

export default MoreInformation