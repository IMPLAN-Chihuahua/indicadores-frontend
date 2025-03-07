import React, { useState, useEffect, useCallback, lazy, Suspense } from "react";
import DatagridTable from "../components/dashboard/common/DatagridTable";
import PageHeader from "../components/dashboard/common/DataHeader";
import { Status } from "../components/dashboard/common/Status";
import { toggleUserStatus, useUsers } from "../services/userService";
import { FORM_USER_ACTIONS } from "../components/dashboard/forms/user/FormUser";
import { getGlobalPerPage } from "../utils/objects";
import { Avatar, Box, Button, CircularProgress, Dialog, DialogTitle, IconButton, Stack, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { parseDate } from "../utils/dateParser";
import { showAlert } from "../utils/alert";
import useQueryParams, { useSearch } from "../hooks/useQueryParams";
import SearchInput from "../components/dashboard/common/SearchInput";
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';

const FormUser = lazy(() => import("../components/dashboard/forms/user/FormUser"));

export const Users = () => {
  const { updatePerPage, updatePage, params } = useQueryParams()
  const { page, perPage } = params
  const { searchQuery, updateSearchQuery } = useSearch();
  const { users, isLoading, mutate, total } = useUsers({ perPage, page, searchQuery });
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState();
  const [selectedUser, setSelectedUser] = useState(null);

  const handleClose = useCallback(() => setOpen(false), [])

  const handleNewUser = useCallback(() => {
    setSelectedUser(null)
    setOpen(true);
    setAction(FORM_USER_ACTIONS.NEW);
  }, [])

  const handleUpdateUser = useCallback((user) => {
    setSelectedUser(user);
    setOpen(true);
    setAction(FORM_USER_ACTIONS.EDIT);
  }, [])

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      editable: false,
      headerAlign: 'right',
      align: 'right',
      hide: true
    },
    {
      field: "urlImagen",
      headerName: "Imagen",
      flex: 1,
      minWidth: 80,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: params => (
        <Avatar
          className='latest-picture'
          alt={params.row.nombres}
          src={params.row.urlImagen} />
      ),
    },
    {
      field: 'nombre',
      headerName: 'Nombre',
      valueGetter: ({ row }) => `${row.nombres} ${row.apellidoPaterno} ${row.apellidoMaterno || ''}`,
      flex: 2,
      minWidth: 200
    },
    {
      field: "correo",
      headerName: "Correo ",
      flex: 2,
      minWidth: 200,
    },
    {
      field: "idRol",
      headerName: "Rol",
      flex: 1,
      minWidth: 100,
      renderCell: params => <Status status={params.row.rol.rol} />,
    },
    {
      field: "activo",
      headerName: "Estado",
      flex: 1,
      minWidth: 100,
      renderCell: params => <Status handleClick={() => toggleStatus(params.row, mutate)} status={params.row.activo} />
    },
    {
      field: "createdAt",
      headerName: "Creación",
      flex: 1,
      minWidth: 100,
      hide: true,
      renderCell: params => <Typography noWrap>{parseDate(params.row.createdAt)}</Typography>
    },
    {
      field: "updatedAt",
      headerName: "Edición",
      flex: 1,
      minWidth: 100,
      hide: true,
      renderCell: params => <Typography noWrap>{parseDate(params.row.createdAt)}</Typography>
    },
    {
      field: "editar",
      headerName: "Editar",
      flex: 1,
      editable: false,
      minWidth: 100,
      sortable: false,
      filterable: false,
      renderCell: params => (
        <Stack direction='row'>
          <IconButton aria-label='editar' onClick={() => handleUpdateUser(params.row)}>
            <EditIcon />
          </IconButton>
        </Stack>
      )
    },
  ];

  return (
    <Box display='flex' flexDirection='column' p={2} height='100%'>
      <PageHeader
        title='Usuarios'
        SearchBar={<SearchInput onDebouncedChange={updateSearchQuery} />}
      >
        <Button
          variant='outlined'
          color='primary'
          onClick={() => mutate()}
        >
          <RefreshIcon />
        </Button>
        <Button onClick={handleNewUser} startIcon={<AddIcon />} variant='outlined'>Agregar usuario</Button>
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>{action} Usuario</DialogTitle>
          <Suspense fallback={<CircularProgress />}>
            <FormUser
              handleCloseModal={handleClose}
              action={action}
              selectedUser={selectedUser}
            />
          </Suspense>
        </Dialog>
      </PageHeader>
      <div className='datagrid-container'>
        <DatagridTable
          rows={users}
          columns={columns}
          page={page}
          perPage={perPage}
          total={total}
          isLoading={isLoading}
          handlePageSizeChange={updatePerPage}
          handlePageChange={updatePage}
        />
      </div>

    </Box>
  );
};

const usersParamsInitialState = () => {
  return {
    page: 1,
    perPage: getGlobalPerPage(),
    searchQuery: '',
    hasActiveFilters: false,
    filters: {}
  }
}


const toggleStatus = (user, onSuccessCallback) => {
  showAlert({
    title: `¿Deseas cambiar el estado de ${user.nombres} ${user.apellidoPaterno}?`,
    text: `Al actualizar este registro, el estado del usuario se alternará, 
    es decir, si se encuentra ACTIVO pasará a estar INACTIVO y viceversa.`,
    icon: 'warning',
    showCancelButton: true
  }).then(option => {
    if (option.isConfirmed) {
      return toggleUserStatus(user.id);
    }
  })
    .then(res => {
      if (res) {
        showAlert({
          title: 'Estado actualizado exitosamente',
          text: `El estado de ${user.nombres} ha sido actualizado.`,
          icon: 'success'
        })
      }
    })
    .catch(err => {
      showAlert({
        title: 'Hubo un error',
        text: err,
        icon: 'error'
      })
    })
    .finally(() => {
      if (typeof onSuccessCallback === 'function') {
        return onSuccessCallback();
      }
    })
};