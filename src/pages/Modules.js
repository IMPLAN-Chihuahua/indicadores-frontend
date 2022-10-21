import { useState, useEffect } from "react";
import DatagridTable from "../components/dashboard/common/DatagridTable";
import { DataHeader } from "../components/dashboard/common/DataHeader";
import { useModules } from "../services/userService";
import ShowImage from "../components/dashboard/common/ShowImage";
import { Status } from "../components/dashboard/common/Status";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import FormDialog from "../components/dashboard/common/FormDialog";
import FormModel from "../components/dashboard/forms/model/FormModel";
import { changeStatusModule } from "../services/moduleService";
import FormDelete from "../components/common/FormDelete";
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import { useAlert } from "../contexts/AlertContext";
import { getGlobalPerPage } from "../utils/objects";
import { Avatar, Box, Typography } from "@mui/material";

export const Modules = () => {
  const [searchModule, setSearchModule] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [perPage, setPerPage] = useState(getGlobalPerPage);

  const [activeCounter, setActiveCounter] = useState(0);
  const [inactiveCounter, setInactiveCounter] = useState(0);

  const { modulos, isLoading, isError } = useModules(perPage, page, searchModule);

  const alert = useAlert();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [clickInfo, setClickInfo] = useState({
    row: { temaIndicador: "" },
  });

  const [removeOpenModal, setRemoveOpenModal] = useState(false);
  const handleRemoveOpenModal = () => setRemoveOpenModal(true);
  const handleRemoveCloseModal = () => setRemoveOpenModal(false);

  const [changeData, setChangeData] = useState({});
  const [rows, setRows] = useState([]);


  const handleStatusModule = (id, topic, element, type) => {
    setChangeData({
      id,
      topic,
      element,
      type
    });
    handleRemoveOpenModal();
  }

  useEffect(() => {
    if (!modulos) {
      return;
    }
    setRows(modulos.data);
    setTotal(modulos.total);
  }, [modulos]);

  const editable = true;
  const headerClassName = "dt-theme--header";
  const sortable = false;
  const headerAlign = "center";
  const align = "center";
  const filterable = false;
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
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
      field: "codigo",
      headerName: "Código",
      flex: 0.5,
      minWidth: 50,
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
      cellClassName: 'cell-overflow',
      sortable,
      headerAlign,
      align,
      filterable,
      renderCell: (params) => {
        return (
          <Box className='lasted-picture'>
              <Avatar
                className='lasted-picture-hoverable'
                variant='rounded'
                src={params.row.urlImagen}
                alt={params.row.temaIndicador}
              />
          </Box>
        );
      },
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
      align: 'left',
      renderCell: (params) => <Typography noWrap>{params.row.temaIndicador}</Typography>
    },
    {
      field: "createdAt",
      headerName: "Creación",
      flex: 1,
      minWidth: 100,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align: 'left',
      renderCell: (params) => (<Typography noWrap>
        {new Date(params.row.createdAt).toLocaleDateString('es-ES', dateOptions)}
      </Typography>)
    },
    {
      field: "updatedAt",
      headerName: "Edición",
      flex: 1,
      minWidth: 100,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align: 'left',
      renderCell: (params) => (<Typography noWrap>
        {new Date(params.row.updatedAt).toLocaleDateString('es-ES', dateOptions)}
      </Typography>)
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
      renderCell: (params) => <Typography noWrap>{params.row.observaciones}</Typography>
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
                  onClick={() => handleStatusModule(params.row.id, "modulo", params.row.temaIndicador, "off")}
                >
                  <ToggleOnIcon />
                </span>
                :
                <span className="dt-action-delete"
                  onClick={() => handleStatusModule(params.row.id, "modulo", params.row.temaIndicador, "on")}
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
        handleClose={() => setOpenModal(false)}
        title={`Editar módulo ${clickInfo.temaIndicador}`}
      >
        <FormModel data={clickInfo} handleCloseModal={handleCloseModal} />
      </FormDialog>
      <FormDialog
        open={removeOpenModal}
        handleClose={() => setRemoveOpenModal(false)}
      >
        <FormDelete topic={changeData?.topic} element={changeData?.element} type={changeData?.type} handleCloseModal={handleRemoveCloseModal}
          handleDelete={
            () => {
              try {
                changeStatusModule(changeData?.id);
                if (rows.find(x => x.id == changeData?.id).activo == 'Activo') {
                  rows.find(x => x.id == changeData?.id).activo = 'Inactivo';
                } else {
                  rows.find(x => x.id == changeData?.id).activo = 'Activo';
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
