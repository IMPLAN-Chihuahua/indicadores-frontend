import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { getRelationUsers } from '../../../../../services/usuarioIndicadorService';
import DatagridTable from '../../../common/DatagridTable';
import { Status } from '../../../common/Status';
import './responsables.css';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PersonalLoader from '../../../../common/PersonalLoader/PersonalLoader';

const Relation = () => {
  const { id } = useParams();
  const [indicador, setIndicador] = useState();
  const [loading, setLoading] = useState(false);

  const indicadorFetcher = async () => {
    const indicador = await getRelationUsers(id);
    return indicador;
  };

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  useEffect(() => {
    indicadorFetcher()
      .then(res => {
        setIndicador(res.data);
        setLoading(true);
      });
  }, [id])

  const headerClassName = "dt-theme--header";
  const sortable = false;
  const headerAlign = "center";
  const align = "center";
  const filterable = false;
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 0.1,
      headerClassName,
      sortable,
      headerAlign,
      align,
      hide: true
    },
    {
      field: 'nombres',
      headerName: 'Nombre de usuario',
      flex: 1,
      minWidth: 150,
      headerClassName,
      sortable,
      headerAlign,
      align: 'center',
      renderCell: (params) => {
        return (
          <Typography>
            {params.row.usuario.nombres} {params.row.usuario.apellidoPaterno}
          </Typography>
        );
      },
    },
    {
      field: 'fechaDesde',
      headerName: 'Fecha desde',
      flex: 0.5,
      minWidth: 50,
      headerClassName,
      sortable,
      headerAlign,
      align,
      renderCell: (params) => {
        return (
          <Typography>
            {params.row.fechaDesde ? params.row.fechaDesde : 'Indefinido'}
          </Typography>
        );
      },
    },
    {
      field: 'fechaHasta',
      headerName: 'Fecha hasta',
      flex: 0.5,
      minWidth: 50,
      headerClassName,
      sortable,
      headerAlign,
      align,
      renderCell: (params) => {
        return (
          <Typography>
            {params.row.fechaHasta ? params.row.fechaHasta : 'Indefinido'}
          </Typography>
        );
      },
    },
    {
      field: "expires",
      headerName: "¿Expira?",
      flex: 0.5,
      editable: true,
      minWidth: 100,
      headerClassName,
      sortable,
      headerAlign,
      align,
      renderCell: (params) => {
        return (<Status status={params.row.expires} type='expires' />);
      },
    },
  ];

  const top100Films = [
    { title: 'John Doe', year: 1994 },
    { title: 'Kellen Daniel Kellen', year: 1968 },
    { title: 'Ivy Pagac Ivy', year: 1998 },
    { title: 'Carroll Hayes', year: 2014 },
  ];

  return (
    <>
      {
        loading ? <>
          <Box className='responsables-header'>
            <h1>Indicador: {indicador?.nombre}</h1>
            <Box className='responsables-header-button'>
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={top100Films}
                disableCloseOnSelect
                getOptionLabel={(option) => option.title}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.title}
                  </li>
                )}
                style={{ width: 500 }}
                renderInput={(params) => (
                  <TextField {...params} label="Checkboxes" placeholder="Favorites" />
                )}
              />
              <Button variant='contained'>+</Button>
            </Box>
          </Box>

          <DatagridTable
            rows={indicador?.data}
            columns={columns}
            total={indicador?.total}
            page={1}
            pageSize={10}
            perPage={10}
          />
        </> :
          <PersonalLoader color="#1976D2" />
      }
    </>
  )
}

export default Relation