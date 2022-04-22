import { Box } from "@mui/material";
import React, { useRef } from "react";
import { useState, useEffect, useMemo } from "react";
import DatagridTable from "../components/dashboard/common/DatagridTable";
import { DataHeader } from "../components/dashboard/common/DataHeader";
import { useModules } from "../services/userService";
import { BeatLoader } from "react-spinners";
import ShowImage from "../components/dashboard/common/ShowImage";
import { Status } from "../components/dashboard/common/Status";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import FormDialog from "../components/dashboard/common/FormDialog";
import FormModel from "../components/dashboard/forms/model/FormModel";
import { DataPagination } from "../components/dashboard/common/DataPagination";
import { changeStatusModule } from "../services/moduleService";
import FormDelete from "../components/common/FormDelete";
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import { useAlert } from "../contexts/AlertContext";

export const Modules = () => {

  let perPage = 5;
  localStorage.getItem("perPage") &&
    (perPage = localStorage.getItem("perPage"));
  let totalPages = 1;
  let rowsModules = [];

  const [searchModule, setSearchModule] = useState("");
  const [paginationCounter, setPaginationCounter] = useState(1);
  const [perPaginationCounter, setPerPaginationCounter] = useState(perPage);

  const [activeCounter, setActiveCounter] = useState(0);
  const [inactiveCounter, setInactiveCounter] = useState(0);

  const isMounted = useRef(true);
  const { modulesList, isLoading, isError } = useModules(
    perPaginationCounter,
    paginationCounter,
    searchModule
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


  const handleStatusModule = (id, topic, element, type ) => {
    setChangeData({
      id,
      topic,
      element,
      type
    });
    handleRemoveOpenModal();  
  }

  if (activeCounter == 0 && inactiveCounter == 0 && modulesList) {
    setActiveCounter(modulesList.total - modulesList.totalInactivos);
    setInactiveCounter(modulesList.totalInactivos);
  }
  modulesList && (totalPages = modulesList.totalPages);
  modulesList && (rowsModules = modulesList.data);
      
    useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  
    useEffect(() => {
      if(modulesList){
        let rowsModulesEdited = []; 
        rowsModules.map((data) => {
          rowsModulesEdited = [
              ...rowsModulesEdited,
              {
                ...data,
                createdAt: data.createdAt.split("T")[0],
                updatedAt: data.updatedAt.split("T")[0],
                activo: data.activo == "SI" ? "Activo" : "Inactivo",
                actions: "Acciones",
              },
            ];
          })
          setDataStore(rowsModulesEdited)
      }
  }, [modulesList]);
  
  const editable = true,
    headerClassName = "dt-theme--header",
    sortable = false,
    headerAlign = "center", 
    align = "center",
    filterable = false;
  const columnsModule = [
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
      field: "temaIndicador",
      headerName: "Tema",
      flex: 1,
      minWidth: 150,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align,
      renderCell: (params) => {
        return (
          <span className="dt-theme--text">{params.row.temaIndicador}</span>
        );
      },
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
      renderCell: (params) => {
        return (
          <ShowImage
            data={{
              title: params.row.temaIndicador,
              url: params.row.urlImagen,
            }}
          />
        );
      },
    },
    {
      field: "color",
      headerName: "Color",
      flex: 0.5,
      minWidth: 80,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align,
      renderCell: (params) => {
        return (
          <div className="params-color">
            <div
              className="params-color--circle"
              style={{
                backgroundColor: params.row.color,
                border: "1px solid rgb(0,0,0,0.2)",
              }}
            ></div>
          </div>
        );
      },
    },
    {
      field: "observaciones",
      headerName: "Observaciones",
      flex: 1,
      minWidth: 200,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align,
      renderCell: (params) => {
        return (
          <span className="dt-theme--text">{params.row.observaciones}</span>
        );
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
        return (<Status status={params.row.activo} />);
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
            onClick={() => handleStatusModule(params.row.id, "modulo",params.row.temaIndicador, "off")}
            >
                <ToggleOnIcon />
            </span>
                :
                <span className="dt-action-delete"
                onClick={() => handleStatusModule(params.row.id, "modulo",params.row.temaIndicador, "on")}
                >
                    <ToggleOffIcon/>
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

  const dataTable = [columnsModule, dataStore];

  const dataModule = {
    topic: "modulo",
    countEnable: activeCounter,
    countDisable: inactiveCounter,
    setSearch: setSearchModule,
    searchValue: searchModule
  };
  return (
    <>

      <DataHeader
        data={dataModule}
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
                dataModule,
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
        title={`Editar módulo ${clickInfo.temaIndicador}`}
      >
        <FormModel data={clickInfo} handleCloseModal={handleCloseModal} />
      </FormDialog>
      <FormDialog
        open={removeOpenModal}
        setOpenModal={setRemoveOpenModal}
      >
        <FormDelete topic={changeData?.topic} element={changeData?.element} type={changeData?.type}  handleCloseModal={handleRemoveCloseModal}  
        handleDelete = {
          () => {
            try {
              changeStatusModule(changeData?.id);
              if(dataStore.find(x => x.id == changeData?.id).activo == 'Activo'){
                dataStore.find(x => x.id == changeData?.id).activo = 'Inactivo';
              }else{
                dataStore.find(x => x.id == changeData?.id).activo = 'Activo';
              }
              alert.success('Estado del modulo cambiado exitosamente');
              handleRemoveCloseModal();
            } catch (err) {
              alert.error(err);
            }
          }}/>
      </FormDialog>
    </>
  );
};
