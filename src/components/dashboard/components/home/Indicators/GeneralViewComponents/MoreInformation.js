import React from 'react'
import '../indicator.css'
import {
  Grid, TextField,
  Typography, Box, Stack,
  Paper, Link as MUILink
} from '@mui/material';
import OwnerListDropdown from '../Owner/OwnerList';
import { CatalogoAutocomplete } from '../../../../common/CatalogPicker';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useAuth } from '../../../../../../contexts/AuthContext';
import { displayLabel } from '../../../../../../utils/getCatalog';

const ODS_ID = 1;
const UNIDAD_MEDIDA_ID = 2;
const COBERTURA_ID = 3;
const CATALOGOS = [ODS_ID, UNIDAD_MEDIDA_ID, COBERTURA_ID];

const MoreInformation = ({ methods, id }) => {
  const { user } = useAuth();

  return (
    <Grid item xs={12} md={6} sx={{
      p: 1,
      height: '100%'
    }}>
      <Stack gap={1} sx={{ p: 1, backgroundColor: 'white' }}>
        <Typography variant='h5' mb={2}>Más información</Typography>

      </Stack>

    </Grid>
  )
}

export default MoreInformation