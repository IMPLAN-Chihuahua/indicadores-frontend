import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import DatagridTable from "../components/dashboard/common/DatagridTable";
import { DataHeader } from "../components/dashboard/common/DataHeader";
import { useIndicators } from "../services/userService";
import { Status } from "../components/dashboard/common/Status";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import FormDialog from "../components/dashboard/common/FormDialog";
import FormRelationship from "../components/dashboard/forms/relationship/FormRelationship";
import { getGlobalPerPage } from "../utils/objects";

export const Relationship = () => {
  const [searchIndicator, setSearchIndicator] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(getGlobalPerPage);
  const [total, setTotal] = useState(0);
  const { indicadores, isLoading, hasError } = useIndicators(perPage, page, searchIndicator);
  const [rows, setRows] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [clickInfo, setClickInfo] = useState({
    row: { temaIndicador: "" },
  });

  useEffect(() => {
    if (!indicadores) {
      return;
    }
    setRows(indicadores.data);
    setTotal(indicadores.total);
  }, [indicadores]);

  const editable = true;
  const headerClassName = "dt-theme--header";
  const sortable = false;
  const headerAlign = "center";
  const align = "center";
  const filterable = false;

  const columns = [
    {
      field: "id",
      headerName: "ID ",
      flex: 0.1,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align,
      hide: true,
    },
    {
      field: "usuario",
      headerName: "Usuario",
      flex: 1,
      minWidth: 150,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align,
      renderCell: (params) => {
        return (
          <span className="dt-theme--text">{params.row.nombre}</span>
        );
      },
    },
    {
      field: "correo",
      headerName: "Correo",
      flex: 1,
      minWidth: 150,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align,
      renderCell: (params) => {
        return (
          <span className="dt-theme--text">{params.row.nombre}</span>
        );
      },
    },
    {
      field: "indicador",
      headerName: "Indicador",
      flex: 1,
      minWidth: 150,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align,
      renderCell: (params) => {
        return (
          <span className="dt-theme--text">{params.row.nombre}</span>
        );
      },
    },

    {
      field: "createdAt",
      headerName: "Asignación",
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
      headerName: "Expiración",
      flex: 0.5,
      minWidth: 100,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align,
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
        return (<Status status={params.row.activo} />);
      },
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 0.5,
      editable: false,
      minWidth: 120,
      headerClassName,
      sortable,
      headerAlign,
      align,
      filterable,
      renderCell: (params) => {
        return (
          <div className="dt-btn-container">
            <span className="dt-action-delete">
              <DeleteOutlineIcon />
            </span>
            <span
              className="dt-action-edit"
              onClick={() => {
                setOpenModal((prev) => !prev);
                setClickInfo(params.row);
              }}
            ><ModeEditIcon /></span>
          </div>
        );
      },
    },
  ];

  const dataIndicator = {
    topic: "registro",
    countEnable: 0,
    countDisable: 0,
    setSearch: setSearchIndicator,
    searchValue: searchIndicator
  };

  return (
    <>
      <DataHeader
        data={dataIndicator}
        handleOpenModal={handleOpenModal}
      />
      <div className='datagrid-container'>
        <DatagridTable
          rows={rows}
          columns={columns}
          isLoading={isLoading}
          page={page}
          total={total}
          perPage={perPage}
          handlePageChange={newPage => setPage(newPage + 1)}
          handlePageSizeChange={size => setPerPage(size)}
        />
      </div>

      <FormDialog
        open={openModal}
        setOpenModal={setOpenModal}
        maxWidth={'lg'}
      >
        <FormRelationship data={clickInfo} handleCloseModal={handleCloseModal} />
      </FormDialog>
    </>
  );
};
