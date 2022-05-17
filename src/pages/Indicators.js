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
import { FormIndicador } from "../components/dashboard/forms/indicador/FormIndicador";
import { HorizontalStepper } from "../components/dashboard/forms/indicador/HorizontalStepper";
import { FormProvider, useForm } from "react-hook-form";
import { Provider } from "react-redux";
import { indicadorStore } from "../components/dashboard/forms/indicador/store";
import FormDelete from "../components/common/FormDelete";
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import { useAlert } from "../contexts/AlertContext";
import { changeStatusIndicator } from "../services/indicatorService";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from 'react-router-dom';


export const Indicators = () => {

  let perPage = localStorage.getItem("perPage") || 5;
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

  const alert = useAlert();
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [clickInfo, setClickInfo] = React.useState({
    row: { temaIndicador: "" },
  });

  const [removeOpenModal, setRemoveOpenModal] = React.useState(false);
  const handleRemoveOpenModal = () => setRemoveOpenModal(true);
  const handleRemoveCloseModal = () => setRemoveOpenModal(false);

  const [changeData, setChangeData] = useState({});
  const [dataStore, setDataStore] = useState([]);

  const navigate = useNavigate();

  const handleStatus = (id, topic, element, type) => {
    setChangeData({
      id,
      topic,
      element,
      type
    });
    handleRemoveOpenModal();
  }

  if (activeCounter == 0 && inactiveCounter == 0 && IndicatorsList) {
    setActiveCounter(IndicatorsList.total - IndicatorsList.totalInactivos);
    setInactiveCounter(IndicatorsList.totalInactivos);
  }
  IndicatorsList && (totalPages = IndicatorsList.totalPages);
  IndicatorsList && (rowsIndicators = IndicatorsList.data);

  let rowsIndicatorsEdited = [];
  useMemo(() => {
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

  useEffect(() => {
    if (IndicatorsList) {
      let rowsIndicatorsEdited = [];
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
      setDataStore(rowsIndicatorsEdited)
    }
  }, [IndicatorsList]);

  const editable = true,
    headerClassName = "dt-theme--header",
    sortable = false,
    headerAlign = "center",
    align = "center",
    filterable = false;
  const columnsIndicator = [
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
      field: "codigo",
      headerName: "#",
      flex: 0.5,
      minWidth: 50,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align,
    },
    {
      field: "codigoObjeto",
      headerName: "#S",
      flex: 1,
      minWidth: 50,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align,
    },
    {
      field: "nombre",
      headerName: "Nombre",
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
      field: "ultimoValorDisponible",
      headerName: "Valor actual",
      flex: 1,
      minWidth: 150,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align,
    },

    {
      field: "tendenciaActual",
      headerName: "Actual",
      flex: 1,
      minWidth: 100,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align,
      renderCell: (params) => {
        return (<Status status={params.row.tendenciaActual} />);
      },
    },
    {
      field: "tendenciaDeseada",
      headerName: "Deseado",
      flex: 1,
      minWidth: 100,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align,
      renderCell: (params) => {
        return (<Status status={params.row.tendenciaDeseada} />);
      },
    },
    {
      field: "urlImagen",
      headerName: "Imagen",
      flex: 0.5,
      minWidth: 100,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align,
      filterable,
      hide: true,
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
      minWidth: 150,
      headerClassName,
      sortable,
      headerAlign,
      align,
      filterable,
      renderCell: (params) => {
        return (
          <div className="dt-btn-container-tri">
            <span
              className="dt-action-delete"
              onClick={() => {
                navigate(`/indicadores/${params.id}`, [navigate])
              }}
            >
              <OpenInNewIcon />
            </span>
            {
              (params.row.activo == 'Activo')
                ?
                <span className="dt-action-delete"
                  onClick={() => handleStatus(params.row.id, "indicador", params.row.nombre, "off")}
                >
                  <ToggleOnIcon />
                </span>
                :
                <span className="dt-action-delete"
                  onClick={() => handleStatus(params.row.id, "indicador", params.row.nombre, "on")}
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

  const dataTable = [columnsIndicator, dataStore];

  const dataIndicator = {
    topic: "indicador",
    // countEnable: activeCounter,
    // countDisable: inactiveCounter,
    countEnable: 100,
    countDisable: 10,
    setSearch: setSearchIndicator,
    searchValue: searchIndicator
  };

  console.log(dataTable);

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
        fullWidth
        keepMounted
        maxWidth='lg'
      >
        <Provider store={indicadorStore}>
          <HorizontalStepper />
        </Provider>
      </FormDialog>
      <FormDialog
        open={removeOpenModal}
        setOpenModal={setRemoveOpenModal}
      >
        <FormDelete topic={changeData?.topic} element={changeData?.element} type={changeData?.type} handleCloseModal={handleRemoveCloseModal}
          handleDelete={
            () => {
              try {
                changeStatusIndicator(changeData?.id);
                if (dataStore.find(x => x.id == changeData?.id).activo == 'Activo') {
                  dataStore.find(x => x.id == changeData?.id).activo = 'Inactivo';
                } else {
                  dataStore.find(x => x.id == changeData?.id).activo = 'Activo';
                }
                alert.success('Estado del modulo cambiado exitosamente');
                handleRemoveCloseModal();
              } catch (err) {
                alert.error(err);
              }
            }} />
      </FormDialog>
    </>
  );
};
