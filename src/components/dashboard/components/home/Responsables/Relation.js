import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { getUsersThatDoesntHaveRelation, useRelationUsers } from '../../../../../services/usuarioIndicadorService';
import { getLastedUsers } from '../../../../../services/userService';
import DatagridTable from '../../../common/DatagridTable';
import { Status } from '../../../common/Status';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PersonalLoader from '../../../../common/PersonalLoader/PersonalLoader';
import FormDuration from '../../../forms/relationship/FormDuration';
import FormDialog from '../../../common/FormDialog';
import './responsables.css';

const Relation = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [params, setParams] = useState([]);

  const usersFetcher = async () => {
    const { data } = await getUsersThatDoesntHaveRelation(id)
    return data;
  };

  const setUsersArray = async () => {
    setLoading(true);
    const users = await usersFetcher();
    setUsers(users);
    setLoading(false);
  };


  const { indicador, isLoading, hasError, mutate } = useRelationUsers(id);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true)
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };


  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  useEffect(() => {
    setUsersArray();
  }, [])

  const headerClassName = "dt-theme--header";
  const sortable = false;
  const headerAlign = "center";
  const align = "center";
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

  const clearUsersSelectedParams = () => {
    setParams([]);
  }

  return (
    <>
      {
        !isLoading ?
          <>
            <Box className='responsables-header '>
              <h1>Indicador: {indicador?.nombre}</h1>
              <Box className='responsables-header-button'>
                <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  options={users}
                  disableCloseOnSelect
                  onChange={(event, value) => {
                    setParams(value);
                  }}
                  value={params}
                  filterSelectedOptions
                  getOptionLabel={(option) => option.nombres}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.nombres}
                    </li>
                  )}
                  style={{ width: 500 }}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Usuarios" placeholder="Usuarios" />
                  )}
                />
                <Box className='responsables-button'>
                  <Button variant='contained' disabled={params.length === 0 ? true : false} onClick={() => { handleOpenModal(); }}>Agregar</Button>
                </Box>
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

            <Box className='responsables-footer'>
              <Button variant='contained'>Cancelar</Button>
              <Button variant='contained'>Guardar</Button>
            </Box>


            <FormDialog
              open={openModal}
              handleClose={() => setOpenModal(false)}
            >
              <FormDuration users={params} handleCloseModal={handleCloseModal} setUsersArray={setUsersArray} mutate={mutate} clearUsersSelectedParams={clearUsersSelectedParams} />
            </FormDialog>
          </>
          :
          <PersonalLoader color="#1976D2" />
      }
    </>
  )
}

export default Relation