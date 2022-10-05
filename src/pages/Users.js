import React, { useState, useEffect } from "react";
import DatagridTable from "../components/dashboard/common/DatagridTable";
import { DataHeader } from "../components/dashboard/common/DataHeader";
import { Status } from "../components/dashboard/common/Status";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import FormDialog from "../components/dashboard/common/FormDialog";
import { changeStatusUser, useUsers } from "../services/userService";
import FormUser from "../components/dashboard/forms/user/FormUser";
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import { useAlert } from "../contexts/AlertContext";
import FormDelete from "../components/common/FormDelete";
import { getGlobalPerPage } from "../utils/objects";
import { Avatar } from "@mui/material";


export const Users = () => {
  const [perPage, setPerPage] = useState(getGlobalPerPage);
  const [page, setPage] = useState(1);
  const [searchUser, setSearchUser] = useState('');
  const [total, setTotal] = useState(0);
  const { users, isLoading, hasError } = useUsers(perPage, page, searchUser);

  const alert = useAlert();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [clickInfo, setClickInfo] = React.useState({
    row: { temaIndicador: "" },
  });

  const [removeOpenModal, setRemoveOpenModal] = useState(false);
  const handleRemoveOpenModal = () => setRemoveOpenModal(true);
  const handleRemoveCloseModal = () => setRemoveOpenModal(false);

  const [changeData, setChangeData] = useState({});
  const [rows, setRows] = useState([]);

  const handleStatus = (id, topic, element, type) => {
    setChangeData({ id, topic, element, type });
    handleRemoveOpenModal();
  }

  useEffect(() => {
    if (!users) {
      return;
    }
    let rowsUsersEdited = [];
    users.data.map((data) => {
      rowsUsersEdited = [
        ...rowsUsersEdited,
        {
          ...data,
          createdAt: data.createdAt.split("T")[0],
          updatedAt: data.updatedAt.split("T")[0],
          idRol: data.idRol === 1 ? "Administrador" : data.idRol === 2 ? "Usuario" : "N/A",
          activo: data.activo === "SI" ? "Activo" : "Inactivo",
          actions: "Acciones",
        },
      ];
    })
    setRows(rowsUsersEdited)
    setTotal(users.total)
  }, [users]);

  const editable = true;
  const headerClassName = "dt-theme--header";
  const sortable = true;
  const headerAlign = "center";
  const align = "center";
  const filterable = false;

  const columns = [
    {
      field: "id",
      headerName: "ID ",
      flex: .5,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align
    },
    {
      field: "urlImagen",
      headerName: "Imagen",
      flex: 0.5,
      minWidth: 80,
      headerClassName,
      editable: false,
      sortable: false,
      filterable: false,
      headerAlign,
      align,
      renderCell: (params) => <Avatar alt={params.row.nombres} src={params.row.urlImagen} />,
    },
    {
      field: 'nombre',
      headerName: 'Nombre',
      headerClassName,
      headerAlign,
      valueGetter: ({ row }) => `${row.nombres} ${row.apellidoPaterno} ${row.apellidoMaterno}`,
      flex: 1,
      align,
      minWidth: 200
    },
    {
      field: "correo",
      headerName: "Correo ",
      flex: 1,
      minWidth: 200,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align,
    },
    {
      field: "createdAt",
      headerName: "Creacion",
      flex: 0.5,
      minWidth: 100,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align,
    },
    {
      field: "updatedAt",
      headerName: "Edicion",
      flex: 0.5,
      minWidth: 100,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align,
    },
    {
      field: "idRol",
      headerName: "Rol",
      flex: 0.5,
      minWidth: 150,
      headerClassName,
      sortable,
      headerAlign,
      align,
      renderCell: (params) => {
        return (<Status status={params.row.idRol} />);
      },
    },
    {
      field: "activo",
      headerName: "Estado",
      flex: 0.5,
      minWidth: 100,
      headerClassName,
      sortable,
      headerAlign,
      align,
      renderCell: (params) => {
        return (<Status status={params.row.activo} />)
      },
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 0.5,
      editable: false,
      minWidth: 100,
      headerClassName,
      sortable,
      headerAlign,
      align,
      filterable,
      renderCell: (params) => {
        return (
          <div className="dt-btn-container">
            {
              (params.row.activo == 'Activo')
                ?
                <span className="dt-action-delete"
                  onClick={() => handleStatus(params.row.id, "usuario", params.row.nombres + " " + params.row.apellidoPaterno + " " + params.row.apellidoMaterno, "off")}
                >
                  <ToggleOnIcon />
                </span>
                :
                <span className="dt-action-delete"
                  onClick={() => handleStatus(params.row.id, "usuario", params.row.nombres + " " + params.row.apellidoPaterno + " " + params.row.apellidoMaterno, "on")}
                >
                  <ToggleOffIcon />
                </span>
            }
            <span
              className="dt-action-edit"
              onClick={() => {
                setOpenModal((prev) => !prev);
                setClickInfo(params.row);
              }}
            >
              <ModeEditIcon />
            </span>
          </div>
        );
      },
    },
  ];

  const dataUser = {
    topic: "usuario",
    countEnable: users?.total - users?.totalInactivos,
    countDisable: users?.totalInactivos,
    setSearch: setSearchUser,
    searchValue: searchUser
  };
  return (
    <>
      <DataHeader
        isLoading={isLoading}
        data={dataUser}
        handleOpenModal={handleOpenModal}
      />
      <div className='datagrid-container'>
        <DatagridTable
          page={page}
          columns={columns}
          rows={rows}
          perPage={perPage}
          total={total}
          isLoading={isLoading}
          handlePageSizeChange={size => setPerPage(size)}
          handlePageChange={page => setPage(page + 1)}
        />

      </div>
      <FormDialog
        open={openModal}
        setOpenModal={setOpenModal}
        title={`Editar Usuario`}
      >
        <FormUser handleCloseModal={handleCloseModal} />
      </FormDialog>
      <FormDialog
        open={removeOpenModal}
        setOpenModal={setRemoveOpenModal}
      >
        <FormDelete topic={changeData?.topic} element={changeData?.element} type={changeData?.type} handleCloseModal={handleRemoveCloseModal}
          handleDelete={
            () => {

              changeStatusUser(changeData?.id)
                .then(res => res.data)
                .then(res => {
                  if (rows.find(x => x.id === changeData?.id).activo === 'Activo') {
                    rows.find(x => x.id === changeData?.id).activo = 'Inactivo';
                  } else {
                    rows.find(x => x.id === changeData?.id).activo = 'Activo';
                  }
                  alert.success('Estado del usuario cambiado exitosamente');
                  handleRemoveCloseModal();
                })
                .catch(err => alert.error(err))

            }} />
      </FormDialog>
    </>
  );
};
