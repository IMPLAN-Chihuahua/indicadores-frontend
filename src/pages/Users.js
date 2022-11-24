import React, { useState, useEffect } from "react";
import DatagridTable from "../components/dashboard/common/DatagridTable";
import { DataHeader } from "../components/dashboard/common/DataHeader";
import { Status } from "../components/dashboard/common/Status";
import FormDialog from "../components/dashboard/common/FormDialog";
import { getUsersGeneralInfo, toggleUserStatus, useUsers } from "../services/userService";
import FormUser, { FORM_USER_ACTIONS } from "../components/dashboard/forms/user/FormUser";
import { getGlobalPerPage } from "../utils/objects";
import { Avatar, DialogTitle, IconButton, Stack, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { parseDate } from "../utils/dateParser";
import { showAlert } from "../utils/alert";


export const Users = () => {
  const [perPage, setPerPage] = useState(getGlobalPerPage);
  const [page, setPage] = useState(1);
  const [searchUser, setSearchUser] = useState('');
  const [total, setTotal] = useState(0);
  const { users, isLoading, mutate } = useUsers(perPage, page, searchUser);

  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formUserAction, setFormUserAction] = useState('');
  const [usersQuantity, setUsersQuantity] = useState(0);
  const [inactiveUsers, setInactiveUsers] = useState(0);

  const [rows, setRows] = useState([]);

  const handleEditUser = (user) => {
    setOpenModal(true);
    setSelectedUser(user);
    setFormUserAction(FORM_USER_ACTIONS.EDIT);
  }

  const handleNewUser = () => {
    setOpenModal(true);
    setFormUserAction(FORM_USER_ACTIONS.NEW);
  }

  const handleUserFormClose = async () => {
    setSelectedUser(null);
    setOpenModal(false);
    await mutate();
  };

  const toggleStatus = user => {
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
      .finally(mutate)
  };

  useEffect(() => {
    getUsersGeneralInfo({
      attributes: ['activo']
    })
      .then(({ data }) => {
        setUsersQuantity(data.total);
        const inactive = data.data.filter(({ activo }) => activo === 'NO').length;
        setInactiveUsers(inactive);
        console.log('ekeke')
      })
  }, [usersQuantity])

  const editable = true;
  const sortable = true;
  const headerAlign = "center";
  const align = "center";
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.3,
      editable: false,
      sortable,
      headerAlign: 'right',
      align: 'right',
      hide: true
    },
    {
      field: "urlImagen",
      headerName: "Imagen",
      flex: 0.1,
      minWidth: 80,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: params => (
        <Avatar
          className='lasted-picture'
          alt={params.row.nombres}
          src={params.row.urlImagen} />
      ),
    },
    {
      field: 'nombre',
      headerName: 'Nombre',
      valueGetter: ({ row }) => `${row.nombres} ${row.apellidoPaterno} ${row.apellidoMaterno || ''}`,
      flex: 1,
      minWidth: 200
    },
    {
      field: "correo",
      headerName: "Correo ",
      flex: 1,
      minWidth: 200,
      editable,
      sortable
    },
    {
      field: "idRol",
      headerName: "Rol",
      flex: 0.2,
      minWidth: 100,
      sortable,
      renderCell: params => <Status status={params.row.rol.rol} />,
    },
    {
      field: "activo",
      headerName: "Estado",
      flex: 0.2,
      minWidth: 100,
      sortable,
      renderCell: params => <Status handleClick={() => toggleStatus(params.row)} status={params.row.activo} />
    },
    {
      field: "createdAt",
      headerName: "Creación",
      flex: 0.5,
      minWidth: 100,
      editable,
      sortable,
      hide: true,
      renderCell: params => <Typography noWrap>{parseDate(params.row.createdAt)}</Typography>
    },
    {
      field: "updatedAt",
      headerName: "Edición",
      flex: 0.5,
      minWidth: 100,
      editable,
      sortable,
      hide: true,
      renderCell: params => <Typography noWrap>{parseDate(params.row.createdAt)}</Typography>
    },
    {
      field: "editar",
      headerName: "Editar",
      flex: 0.2,
      editable: false,
      minWidth: 100,
      sortable: false,
      headerAlign,
      align,
      filterable: false,
      renderCell: params => (
        <Stack direction='row'>
          <IconButton aria-label='editar' onClick={() => handleEditUser(params.row)}>
            <EditIcon />
          </IconButton>
        </Stack>
      )
    },
  ];

  useEffect(() => {
    if (!users) {
      return;
    }
    setRows(users.data);
    setTotal(users.total);
  }, [users]);

  const dataUser = {
    topic: "usuario",
    countEnable: usersQuantity || 0,
    countDisable: inactiveUsers || 0,
    setSearch: setSearchUser,
    searchValue: searchUser
  };

  return (
    <>
      <DataHeader
        isLoading={isLoading}
        data={dataUser}
        handleOpenModal={handleNewUser}
      />
      <div className='datagrid-container'>
        <DatagridTable
          rows={rows}
          columns={columns}
          page={page}
          perPage={perPage}
          total={total}
          isLoading={isLoading}
          handlePageSizeChange={size => setPerPage(size)}
          handlePageChange={page => setPage(page + 1)}
        />
      </div>
      <FormDialog
        open={openModal}
        handleClose={handleUserFormClose}
      >
        <DialogTitle>{formUserAction} Usuario</DialogTitle>
        <FormUser
          handleCloseModal={handleUserFormClose}
          action={formUserAction}
          selectedUser={selectedUser}
        />
      </FormDialog>
    </>
  );
};
