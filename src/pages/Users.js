import { Box } from "@mui/material";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import DatagridTable from "../components/dashboard/common/DatagridTable";
import { DataHeader } from "../components/dashboard/common/DataHeader";
import { useUsers } from "../services/userService";
import { BeatLoader } from "react-spinners";
import ShowImage from "../components/dashboard/common/ShowImage";
import { Status } from "../components/dashboard/common/Status";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import FormDialog from "../components/dashboard/common/FormDialog";
import { DataPagination } from "../components/dashboard/common/DataPagination";
import FormUser from "../components/dashboard/forms/user/FormUser";

export const Users = () => {
  let perPage = localStorage.getItem("perPage") || 5;
  let totalPages = 1;
  let rowsUsers = [];

  const [searchUser, setSearchUser] = useState("");
  const [paginationCounter, setPaginationCounter] = useState(1);
  const [perPaginationCounter, setPerPaginationCounter] = useState(perPage);

  const [activeCounter, setActiveCounter] = useState(0);
  const [inactiveCounter, setInactiveCounter] = useState(0);

  const isMounted = useRef(true);
  const { usersList, isLoading, isError } = useUsers(
    perPaginationCounter,
    paginationCounter,
    searchUser
  );
  
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [clickInfo, setClickInfo] = React.useState({
    row: { temaIndicador: "" },
  });

  if (activeCounter === 0 && inactiveCounter === 0 && usersList) {
    setActiveCounter(usersList.total - usersList.totalInactivos);
    setInactiveCounter(usersList.totalInactivos);
  }
  usersList && (totalPages = usersList.totalPages);
  usersList && (rowsUsers = usersList.data);

  let rowsUsersEdited = [];
  rowsUsers.map((data) => {
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
  });
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const editable = true,
    headerClassName = "dt-theme--header",
    sortable = false,
    headerAlign = "center",
    align = "center",
    filterable = false;
  const columnsUsers = [
    {
      field: "id",
      headerName: "ID ",
      flex: 0.1,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align
    },

    {
      field: "nombres",
      headerName: "Nombre ",
      flex: 1,
      minWidth: 160,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align,
    },
    {
      field: "apellidoPaterno",
      headerName: "Apellido Paterno ",
      flex: 1,
      minWidth: 200,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align,
    },
    {
      field: "apellidoMaterno",
      headerName: "Apellido Materno ",
      flex: 1,
      minWidth: 200,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align,
    },
    {
      field: "correo",
      headerName: "Correo ",
      flex: 1,
      minWidth: 300,
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
      minWidth: 150,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align,
    },
    {
      field: "updatedAt",
      headerName: "Actualizacion",
      flex: 0.5,
      minWidth: 150,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align,
    },
    {
      field: "avatar",
      headerName: "Avatar ",
      flex: 0.5,
      minWidth: 100,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align,
      filterable,
      renderCell: (params) => {
        return (
          <ShowImage
            data={{
              title: params.row.correo,
              url: params.row.avatar,
            }}
          />
        );
      },
    },
    {
      field: "idRol",
      headerName: "Rol",
      flex: 0.5,
      minWidth: 160,
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
      editable: true,
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
      minWidth: 150,
      headerClassName,
      sortable,
      headerAlign,
      align,
      filterable,
      renderCell: (params) => {
        return (
          <div className="dt-btn-container">
            <span className="dt-action-delete">
              {" "}
              <DeleteOutlineIcon />{" "}
            </span>
            <span
              className="dt-action-edit"
              onClick={() => {
                setOpenModal((prev) => !prev);
                setClickInfo(params.row);
              }}
            >
              {" "}
              <ModeEditIcon />{" "}
            </span>
          </div>
        );
      },
    },
  ];

  const dataTable = [columnsUsers, rowsUsersEdited];

  const dataUser = {
    topic: "usuario",
    countEnable: activeCounter,
    countDisable: inactiveCounter,
    setSearch: setSearchUser,
    searchValue: searchUser
  };
  return (
    <>
      <DataHeader
        data={dataUser}
        handleOpenModal={handleOpenModal}
      />
      <Box className="dt-table">
        {isLoading ? (
          <Box className="dt-loading">
            <BeatLoader size={15} color="#1976D2" />
          </Box>
        ) : (
          <>
            <DatagridTable data={dataTable} />
            <DataPagination
              data={{
                dataRecords: dataUser,
                paginationCounter,
                setPaginationCounter,
                perPaginationCounter,
                setPerPaginationCounter,
                totalPages,
                perPage,
              }}
            />
          </>
        )}
      </Box>

      <FormDialog
        open={openModal}
        setOpenModal={setOpenModal}
        title={`Editar Usuario`}
      >
        <FormUser handleCloseModal={handleCloseModal}/>
      </FormDialog>
    </>
  );
};
