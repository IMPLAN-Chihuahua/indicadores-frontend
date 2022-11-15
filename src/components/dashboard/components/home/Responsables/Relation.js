import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { getUsersThatDoesntHaveRelation, useRelationUsers, deleteRelation } from '../../../../../services/usuarioIndicadorService';
import DatagridTable from '../../../common/DatagridTable';
import { Status } from '../../../common/Status';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PersonalLoader from '../../../../common/PersonalLoader/PersonalLoader';
import FormDuration from '../../../forms/relationship/FormDuration';
import FormDialog from '../../../common/FormDialog';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './responsables.css';
import Swal from 'sweetalert2';

const Relation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [params, setParams] = useState([]);
  const [editParams, setEditParams] = useState([]);
  const [action, setAction] = useState('NEW');
  const [relationData, setRelationData] = useState({});

  const usersFetcher = async () => {
    const { data } = await getUsersThatDoesntHaveRelation(id)
    return data;
  };

  const setUsersArray = async () => {
    const users = await usersFetcher();
    setUsers(users);
  };

  const { indicador, isLoading, hasError, mutate } = useRelationUsers(id);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (action) => {
    setOpenModal(true)
    setAction(action);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  useEffect(() => {
    setUsersArray();
  }, []);

  const handleDelete = async ({ id }) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRelation(id)
          .then(_ => {
            Swal.fire(
              'Borrado!',
              'El usuario ha sido eliminado.',
              'success'
            )
            mutate();
            setUsersArray();
          })
      }
    })
  };

  const handleEdit = (data) => {
    setEditParams([data.usuario]);
    setRelationData({
      id: data.id,
      fechaDesde: data.fechaDesde,
      fechaHasta: data.fechaHasta,
      expires: data.expires
    });
    handleOpenModal('EDIT');
  };

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
    {
      field: "actions",
      headerName: "Acciones",
      flex: 0.5,
      editable: false,
      minWidth: 150,
      headerClassName,
      sortable,
      headerAlign,
      align,
      renderCell: (params) => {
        return (
          <div className="dt-btn-container-tri">
            <span
              className="dt-action-delete"
              onClick={() => {
                handleDelete(params.row);
              }}
            >
              <DeleteForeverIcon />
            </span>
            <span
              className="dt-action-edit"
              onClick={() => {
                handleEdit(params.row);
              }}
            >
              <ModeEditIcon />
            </span>
          </div>
        );
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
                  <Button variant='contained' disabled={params.length === 0 ? true : false} onClick={() => { handleOpenModal('NEW'); }}>Agregar</Button>
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
              <Button variant='contained'
                onClick={() => {
                  clearUsersSelectedParams();
                  navigate(`/autorizacion`, [navigate])
                }}
              >Cancelar</Button>
            </Box>

            <FormDialog
              open={openModal}
              handleClose={() => setOpenModal(false)}
            >
              <FormDuration users={action === 'NEW' ? params : editParams} handleCloseModal={handleCloseModal} setUsersArray={setUsersArray} mutate={mutate} clearUsersSelectedParams={clearUsersSelectedParams} action={action} relationData={relationData} />
            </FormDialog>
          </>
          :
          <PersonalLoader color="#1976D2" />
      }
    </>
  )
}

export default Relation