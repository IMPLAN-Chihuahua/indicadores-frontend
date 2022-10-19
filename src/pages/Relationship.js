import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import DatagridTable from "../components/dashboard/common/DatagridTable";
import { DataHeader } from "../components/dashboard/common/DataHeader";
import { useIndicadorUsuarios } from "../services/usuarioIndicadorService";
import { Status } from "../components/dashboard/common/Status";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import FormDialog from "../components/dashboard/common/FormDialog";
import FormRelationship from "../components/dashboard/forms/relationship/FormRelationship";
import { getGlobalPerPage } from "../utils/objects";
import { useNavigate } from "react-router-dom";

export const Relationship = () => {
  const [searchIndicator, setSearchIndicator] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(getGlobalPerPage);
  const [total, setTotal] = useState(0);
  const { indicadores, isLoading, hasError, mutate } = useIndicadorUsuarios();
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

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
      field: "nombre",
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
      field: "count",
      headerName: "Cantidad de usuarios asignados",
      flex: 1,
      minWidth: 150,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align,
      renderCell: (params) => {
        return (
          <span className="dt-theme--text">{params.row.count}</span>
        );
      },
    },
    {
      field: "owner",
      headerName: "Responsable del indicador",
      flex: 1,
      minWidth: 150,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align,
      renderCell: (params) => {
        return (
          <span className="dt-theme--text">{params.row.owner}</span>
        );
      },
    },

    {
      field: "updatedAt",
      headerName: "Fecha de modificación",
      flex: 0.5,
      minWidth: 100,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align,
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
          <span
            className="dt-action-edit"
            onClick={() => {
              navigate(`/autorizacion/indicador/${params.id}`, [navigate])
            }}
          ><ModeEditIcon /></span>
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
        <FormRelationship data={clickInfo} handleCloseModal={handleCloseModal} mutate={mutate} />
      </FormDialog>
    </>
  );
};
