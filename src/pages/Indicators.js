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
              className="dt-action-edit"
              onClick={() => {
                setFormVisible((prev) => !prev);
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

  const dataIndicator = {
    topic: "indicador",
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
