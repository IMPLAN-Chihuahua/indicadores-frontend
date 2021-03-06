import { Box } from "@mui/material";
import React, { useRef } from "react";
import { useState, useEffect, useMemo } from "react";
import DatagridTable from "../components/dashboard/common/DatagridTable";
import { DataHeader } from "../components/dashboard/common/DataHeader";
import { useIndicators } from "../services/userService";
import { BeatLoader } from "react-spinners";
import ShowImage from "../components/dashboard/common/ShowImage";
import { Status } from "../components/dashboard/common/Status";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import FormDialog from "../components/dashboard/common/FormDialog";
import FormModel from "../components/dashboard/forms/model/FormModel";
import { DataPagination } from "../components/dashboard/common/DataPagination";
import FormRelationship from "../components/dashboard/forms/relationship/FormRelationship";

export const Relationship = () => {
  let perPage = 5;
  localStorage.getItem("perPage") &&
    (perPage = localStorage.getItem("perPage"));
  let totalPages = 1;
  let rowsIndicators = [];


  const [searchIndicator, setSearchIndicator] = useState("");
  const [paginationCounter, setPaginationCounter] = useState(1);
  const [perPaginationCounter, setPerPaginationCounter] = useState(perPage);

  const [activeCounter, setActiveCounter] = useState(0);
  const [inactiveCounter, setInactiveCounter] = useState(0);

  const isMounted = useRef(true);
  const { IndicatorsList, isLoading, isError } = useIndicators(
    perPaginationCounter,
    paginationCounter,
    searchIndicator
  );

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [clickInfo, setClickInfo] = React.useState({
    row: { temaIndicador: "" },
  });

  if (activeCounter == 0 && inactiveCounter == 0 && IndicatorsList) {
    setActiveCounter(IndicatorsList.total - IndicatorsList.totalInactivos);
    setInactiveCounter(IndicatorsList.totalInactivos);
  }
  IndicatorsList && (totalPages = IndicatorsList.totalPages);
  IndicatorsList && (rowsIndicators = IndicatorsList.data);

  let rowsIndicatorsEdited = [];
  useMemo ( () => {
    rowsIndicators.map((data) => {
      rowsIndicatorsEdited = [
        ...rowsIndicatorsEdited,
        {
          ...data,
          createdAt: data.createdAt.split("T")[0],
          updatedAt: data.updatedAt.split("T")[0],
          activo: data.activo == "SI" ? "Activo" : "Inactivo",
          actions: "Acciones",
        },
      ];
  })
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
  const columnsIndicator =  [
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
      headerName: "Asignaci??n",
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
      headerName: "Expiraci??n",
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
  const dataTable = [columnsIndicator, rowsIndicatorsEdited,''];
  const dataIndicator = {
    topic: "registro",
    // countEnable: activeCounter,
    // countDisable: inactiveCounter,
    countEnable: 100,
    countDisable: 10,
    setSearch: setSearchIndicator,
    searchValue: searchIndicator
  };
  return (
    <>

      <DataHeader
        data={dataIndicator}
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
                dataIndicator,
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
        title={`Editar m??dulo ${clickInfo.temaIndicador}`}
        maxWidth={'lg'}
      >
        <FormRelationship data={clickInfo} handleCloseModal={handleCloseModal} />
      </FormDialog>

    </>
  );
};
