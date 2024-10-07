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
import { getCoberturas } from '../../../../../../services/coberturasService';
import { getObjetivos } from '../../../../../../services/dimensionService';
import { getOds } from '../../../../../../services/odsService';

const getTemasRes = async () => {
  const temas = await getTemas();
  return temas;
};

const getObjetivosRes = async () => {
  const { data: objetivos } = await getObjetivos();
  return objetivos.data;
}

const getCoberturasRes = async () => {
  const coberturas = await getCoberturas();

  return coberturas;
};

const getOdsRes = async () => {
  const ods = await getOds();
  return ods;
}

const MoreInformation = ({ methods, id }) => {
  const [temasRes, setTemas] = React.useState([]);
  const [objetivos, setObjetivos] = React.useState([]);
  const [coberturas, setCoberturas] = React.useState([]);
  const [ods, setOds] = React.useState([]);

  useEffect(() => {
    getTemasRes().then(temas => {
      setTemas(temas);
    })

    getObjetivosRes().then(objetivos => {
      setObjetivos(objetivos);
    })

    getCoberturasRes().then(coberturas => {
      setCoberturas(coberturas);
    })

    getOdsRes().then(ods => {
      setOds(ods);
    })

  }, []);

  console.log(ods);

  return (
    <Grid item xs={12} md={6} sx={{
      p: 1,
      height: '100%',
    }}>
      <Stack gap={2} sx={{ p: 1, backgroundColor: 'white', height: '100%' }}>
        <Typography variant='h5' mb={2}>Mássss información</Typography>
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
          name='idCobertura'
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Autocomplete
              value={
                coberturas.find(cobertura => cobertura.id === value) || value
              }
              options={coberturas}
              getOptionLabel={(option) => option.tipo}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(_, data) => onChange(data)}
              id='coberturas'
              renderInput={(params) => <TextField {...params} label='Cobertura geográfica' />}
            />
          )}
        />
        <Controller
          control={methods.control}
          name='idOds'
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Autocomplete
              value={
                ods.find(ods => ods.id === value) || value
              }
              options={ods}
              getOptionLabel={(option) => option.titulo}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(_, data) => onChange(data)}
              id='ods'
              renderInput={(params) => <TextField {...params} label='Objetivo de Desarrollo Sostenible' />}
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
              id='objetivos'
              renderInput={(params) => <TextField {...params} label='Objetivos del PDU2040' />}
            />
          )}
        />
      </Stack>
    </Grid>
  )
}

export default MoreInformation