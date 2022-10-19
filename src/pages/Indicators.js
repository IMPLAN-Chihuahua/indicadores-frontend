import { useState, useEffect } from "react";
import DatagridTable from "../components/dashboard/common/DatagridTable";
import { DataHeader } from "../components/dashboard/common/DataHeader";
import { useIndicators } from "../services/userService";
import { Status } from "../components/dashboard/common/Status";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import FormDialog from "../components/dashboard/common/FormDialog";
import { FormIndicador } from "../components/dashboard/forms/indicador/FormIndicador";
import FormDelete from "../components/common/FormDelete";
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import { useAlert } from "../contexts/AlertContext";
import { changeStatusIndicator } from "../services/indicatorService";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from 'react-router-dom';
import { getGlobalPerPage } from "../utils/objects";
import { Typography } from "@mui/material";

export const Indicators = () => {
  const navigate = useNavigate();
  const [searchIndicator, setSearchIndicator] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(getGlobalPerPage);
  const [total, setTotal] = useState(0)
  const { indicadores, isLoading, hasError } = useIndicators(perPage, page, searchIndicator);
  const alert = useAlert();
  const [isFormVisible, setFormVisible] = useState(false);
  const handleOpenModal = () => setFormVisible(true);
  const handleCloseModal = () => setFormVisible(false);

  const [clickInfo, setClickInfo] = useState({
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
      field: "nombre",
      headerName: "Nombre",
      flex: 1,
      minWidth: 150,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align: 'left',
      renderCell: (params) => <Typography noWrap>{params.row.nombre}</Typography>,
    },

    {
      field: "ultimoValorDisponible",
      headerName: "Valor actual",
      flex: .5,
      minWidth: 100,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align: 'right',
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
      headerName: "Creación",
      flex: 0.5,
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
      flex: 0.5,
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
            {
              (params.row.activo === 'Activo')
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
              className="dt-action-delete"
              onClick={() => {
                navigate(`/indicadores/${params.id}`, [navigate])
              }}
            >
              <OpenInNewIcon />
            </span>
          </div>
        );
      },
    },
  ];

  const dataIndicator = {
    topic: "indicador",
    countEnable: indicadores ? indicadores.total - indicadores.totalInactive : '',
    countDisable: indicadores ? indicadores.totalInactive : '',
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
      {
        isFormVisible && (
          <FormDialog
            open={isFormVisible}
            setOpenModal={setFormVisible}
            fullWidth
            keepMounted
            maxWidth='xl'
          >
            <FormIndicador close={() => setFormVisible(false)} />
          </FormDialog>
        )
      }
      <FormDialog
        open={removeOpenModal}
        setOpenModal={setRemoveOpenModal}
      >
        <FormDelete topic={changeData?.topic} element={changeData?.element} type={changeData?.type} handleCloseModal={handleRemoveCloseModal}
          handleDelete={
            () => {
              try {
                changeStatusIndicator(changeData?.id);
                if (rows.find(x => x.id === changeData?.id).activo === 'Activo') {
                  rows.find(x => x.id === changeData?.id).activo = 'Inactivo';
                } else {
                  rows.find(x => x.id === changeData?.id).activo = 'Activo';
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
