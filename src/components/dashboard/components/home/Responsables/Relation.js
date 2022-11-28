import { Box, Button, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import React, { useCallback } from 'react'
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
import { getGlobalPerPage } from '../../../../../utils/objects';
import useIsMounted from '../../../../../hooks/useIsMounted';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const Relation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [params, setParams] = useState([]);
  const [editParams, setEditParams] = useState([]);
  const [action, setAction] = useState('NEW');
  const [relationData, setRelationData] = useState({});
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(getGlobalPerPage);
  const isMounted = useIsMounted();

  const usersFetcher = async () => {
    const { data } = await getUsersThatDoesntHaveRelation(id)
    return data;
  };

  const setUsersArray = useCallback(async () => {
    const users = await usersFetcher();
    if (isMounted()) {
      setUsers(users);
    }
  }, [isMounted]);

  const { indicador, isLoading, hasError, mutate } = useRelationUsers(id, page, perPage);
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
  }, [setUsersArray]);

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

  const headerClassName = "";
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
      headerAlign: 'right',
      align: 'right',
      hide: true
    },
    {
      field: 'nombres',
      headerName: 'Nombre de usuario',
      flex: 1,
      minWidth: 150,
      headerClassName,
      sortable,
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
      flex: 0.2,
      minWidth: 50,
      headerClassName,
      sortable,
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
      renderCell: (params) => (
        <Stack direction='row'>
          <Tooltip title='Eliminar autorización'>
            <IconButton
              onClick={() => handleDelete(params.row)}
            >
              <DeleteForeverIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Editar autorización'>
            <IconButton 
              onClick={() => handleEdit(params.row)}
            >
              <ModeEditIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      )
    },
  ];

  const clearUsersSelectedParams = () => {
    setParams([]);
  }

  if (isLoading) {
    return <PersonalLoader />;
  }

  return (
    <Box display='flex' flexDirection='column' height='100%' p={2}>
      <Stack justifyContent='space-between' direction='row' justifySelf='flex-start'>
        <Box display='flex' alignItems='center'>
          <Tooltip title='Regresar'>
            <IconButton
              sx={{ border: 1, borderColor: 'divider', mr: 1, backgroundColor: 'white' }}
              onClick={() => {
                clearUsersSelectedParams();
                navigate(-1);
              }}
            >
              <NavigateBeforeIcon fontSize='large' />
            </IconButton>
          </Tooltip>
          <Typography variant='h4'>Indicador: {indicador?.nombre}</Typography>
        </Box>
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
      </Stack>

      <DatagridTable
        rows={indicador?.data}
        columns={columns}
        total={indicador?.total}
        page={page}
        perPage={perPage}
        handlePageChange={newPage => setPage(newPage + 1)}
        handlePageSizeChange={size => setPerPage(size)}
      />
      <FormDialog
        open={openModal}
        handleClose={() => setOpenModal(false)}
      >
        <FormDuration
          users={action === 'NEW' ? params : editParams}
          handleCloseModal={handleCloseModal}
          setUsersArray={setUsersArray}
          mutate={mutate}
          clearUsersSelectedParams={clearUsersSelectedParams}
          action={action}
          relationData={relationData}
        />
      </FormDialog>
    </Box>
  )
}

export default Relation