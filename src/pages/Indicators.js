import { useState, useEffect } from "react";
import DatagridTable from "../components/dashboard/common/DatagridTable";
import { DataHeader } from "../components/dashboard/common/DataHeader";
import { useIndicators } from "../services/userService";
import { Status } from "../components/dashboard/common/Status";
import FormDialog from "../components/dashboard/common/FormDialog";
import { FormIndicador } from "../components/dashboard/forms/indicador/FormIndicador";
import { useNavigate } from 'react-router-dom';
import { getGlobalPerPage } from "../utils/objects";
import { IconButton, Link, Typography } from "@mui/material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { parseDate } from "../utils/dateParser";
import { showAlert } from "../utils/alert";
import { toggleIndicadorStatus } from "../services/indicatorService";

export const Indicators = () => {
  const navigate = useNavigate();
  const [searchIndicator, setSearchIndicator] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(getGlobalPerPage);
  const [total, setTotal] = useState(0)
  const { indicadores, isLoading, hasError, mutate } = useIndicators(perPage, page, searchIndicator);
  const [isFormVisible, setFormVisible] = useState(false);
  const handleOpenModal = () => setFormVisible(true);
  const handleCloseModal = () => setFormVisible(false);

  const [changeData, setChangeData] = useState({});
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (!indicadores) {
      return;
    }
    setRows(indicadores.data);
    setTotal(indicadores.total);
  }, [indicadores]);

  const toggleStatus = (indicador) => {
    showAlert({
      title: `¿Deseas cambiar el estado de ${indicador.nombre}?`,
      text: `Al actualizar este registro, el estado del indicador se alternará, 
      es decir, si se encuentra ACTIVO pasará a estar INACTIVO y viceversa.`,
      icon: 'warning',
      showCancelButton: true
    }).then(option => {
      if (option.isConfirmed) {
        return toggleIndicadorStatus(indicador.id);
      }
    })
      .then(res => {
        if (res) {
          showAlert({
            title: 'Estado actualizado exitosamente',
            text: `El estado de ${indicador.nombre} ha sido actualizado.`,
            icon: 'success'
          })
        }
      })
      .catch(err => {
        showAlert({
          title: 'Hubo un error',
          text: err,
          icon: 'error'
        })
      })
      .finally(mutate)
  }

  const editable = true;
  const headerClassName = "dt-theme--header";
  const sortable = false;
  const headerAlign = "center";
  const align = "center";
  const columns = [
    {
      field: "id",
      headerName: "ID ",
      flex: 0.1,
      editable,
      sortable,
      headerAlign,
      align,
      hide: true,
    },
    {
      field: "codigo",
      headerName: "Código",
      flex: 0.2,
      minWidth: 50,
      editable: 'false',
      sortable,
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: "nombre",
      headerName: "Nombre",
      flex: 1,
      minWidth: 150,
      editable: false,
      sortable,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => <Typography noWrap>{params.row.nombre}</Typography>,
    },
    {
      field: "ultimoValorDisponible",
      headerName: "Valor actual",
      flex: .5,
      minWidth: 100,
      editable,
      sortable,
      headerAlign: 'right',
      align: 'right',
    },
    {
      field: "definicion",
      headerName: "Definición",
      flex: 2,
      minWidth: 150,
      editable: false,
      sortable,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => <Typography noWrap>{params.row.definicion}</Typography>,
    },
    {
      field: "activo",
      headerName: "Estado",
      flex: 0.2,
      editable: false,
      minWidth: 100,
      sortable,
      renderCell: (params) => (
        <Status
          status={params.row.activo}
          handleClick={() => toggleStatus(params.row)}
        />
      ),
    },
    {
      field: "createdAt",
      headerName: "Creación",
      flex: 0.5,
      minWidth: 100,
      editable,
      sortable,
      headerAlign: 'left',
      hide: true,
      align: 'left',
      renderCell: (params) => (<Typography noWrap>
        {parseDate(params.row.createdAt)}
      </Typography>)
    },
    {
      field: "updatedAt",
      headerName: "Edición",
      flex: 0.3,
      minWidth: 100,
      editable,
      sortable,
      headerAlign: 'left',
      hide: true,
      align: 'left',
      renderCell: (params) => (<Typography noWrap>
        {parseDate(params.row.updatedAt)}
      </Typography>)
    },
    {
      field: "moreInfo",
      headerName: "Editar",
      flex: 0.2,
      minWidth: 30,
      editable: false,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          sx={{
            border: '1px solid #d2d2d2',
          }}
          onClick={() => navigate(`/indicadores/${params.row.id}`)}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      )
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
            handleClose={() => setFormVisible(false)}
            fullWidth
            keepMounted
            maxWidth='xl'
          >
            <FormIndicador close={() => setFormVisible(false)} />
          </FormDialog>
        )
      }
    </>
  );
};
