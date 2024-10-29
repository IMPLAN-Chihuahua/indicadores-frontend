import { useState, lazy, Suspense, useCallback } from "react";
import { useIndicadores } from "../services/indicatorService";
import DatagridTable from "../components/dashboard/common/DatagridTable";
import { getGlobalPerPage } from "../utils/objects";
import { Box, Button, Chip, Dialog, IconButton, Link as MuiLink, Typography } from "@mui/material";
import { showAlert } from "../utils/alert";
import { toggleIndicadorStatus } from "../services/indicatorService";
import { Link } from "react-router-dom";
import { intlFormat, parseISO } from 'date-fns'
import PageHeader from "../components/dashboard/common/DataHeader";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import useIsMounted from "../hooks/useIsMounted";
import SearchInput from "../components/dashboard/common/SearchInput";
import useQueryParams from "../hooks/useQueryParams";
import { Status } from "../components/dashboard/common/Status";


export const Indicators = () => {
  const { updateSearchQuery, updateFilters, updatePage, updatePerPage, params } = useQueryParams(indicadoresParamsInitialState)
  const { page, perPage, searchQuery, hasActiveFilters, filters } = params;
  const { indicadores, isLoading, mutate, total } = useIndicadores({ page, perPage, searchQuery, ...filters });
  const [selectedIndicadores, setSelectedIndicadores] = useState([]);

  const columns = [
    {
      field: "id",
      headerName: "ID ",
      flex: 1,
      maxWidth: 50,
      editable: false,
      headerAlign: 'right',
      align: 'right',
      hide: true,
    },
    {
      field: "codigo",
      headerName: "Código",
      minWidth: 30,
      editable: false,
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: "nombre",
      headerName: "Nombre",
      flex: 2,
      minWidth: 200,
      editable: false,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => (
        <MuiLink component={Link} to={`/indicadores/${params.row.id}`}>{params.row.nombre}</MuiLink>
      )
    },
    {
      field: "ultimoValorDisponible",
      headerName: "Valor actual",
      flex: 1,
      minWidth: 100,
      headerAlign: 'right',
      align: 'right',
    },
    {
      field: "adornment",
      headerName: "Simbolo",
      flex: 1,
      maxWidth: 80,
      editable: false,
      sortable: false,
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: "unidadMedida",
      headerName: "Unidad de medida",
      flex: 1,
      minWidth: 150,
      editable: false,
      sortable: false,
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: "usuarios",
      headerName: "Responsable",
      flex: 1,
      minWidth: 80,
      editable: false,
      sortable: false,
      headerAlign: 'left',
      align: 'left',
      valueGetter: (params) => params.row.usuarios.length > 0 ? params.row.usuarios[0].nombres : 'NA'
    },
    {
      field: "periodicidad",
      headerName: "Actualización",
      flex: 1,
      maxWidth: 120,
      editable: false,
      sortable: false,
      headerAlign: 'left',
      align: 'left',
      valueGetter: params => `Cada ${params.row.periodicidad === 1 ? 'mes' : `${params.row.periodicidad} meses`}`,
    },
    {
      field: "updatedAt",
      headerName: "Última actualización",
      flex: 1,
      headerAlign: 'left',
      align: 'left',
      valueGetter: params => intlFormat(parseISO(params.row.updatedAt), { locale: 'es-MX' })
    },
    {
      field: "createdAt",
      headerName: "Creado",
      headerAlign: 'left',
      align: 'left',
      hide: true,
      valueGetter: params => intlFormat(parseISO(params.row.createdAt), { locale: 'es-MX' })
    },
    {
      field: "activo",
      headerName: "Estado",
      editable: false,
      flex: 1,
      renderCell: (params) => (
        <Status handleClick={() => toggleStatus(params.row, mutate)} status={params.row.activo} />
      ),
    },
  ];

  const rowSelectionHandler = (ids) => {
    const selectedData = ids.map(id => indicadores.find(row => row.id === id));
    setSelectedIndicadores(selectedData);
  }


  return (
    <Box display='flex' flexDirection='column' p={2} height='100%'>
      <PageHeader
        title='Indicadores'
        SearchBar={
          <SearchInput
            placeholder='Buscar por nombre, unidad de medida o código'
            onDebouncedChange={updateSearchQuery}
            AdvancedSearch={<IndicadoresFilterDialog submitCallback={updateFilters} hasActiveFilters={hasActiveFilters} />}
          />
        }
      >
        <Button
          variant="outlined"
          onClick={() => mutate()}
          color="primary"
        >
          <RefreshIcon />
        </Button>
        <NewIndicadorDialog />
      </PageHeader>
      <div className='datagrid-container'>
        <DatagridTable
          rows={indicadores}
          columns={columns}
          isLoading={isLoading}
          page={page}
          total={total}
          perPage={perPage}
          onSelectionModelChange={rowSelectionHandler}
          handlePageChange={updatePage}
          handlePageSizeChange={updatePerPage}
        />
      </div>
    </Box>
  );
};


const indicadoresParamsInitialState = () => {
  return {
    page: 1,
    perPage: getGlobalPerPage(),
    searchQuery: '',
    hasActiveFilters: false,
    filters: {
      owner: null,
      objetivos: [],
      temas: [],
      usuarios: [],
    }
  }
}


const toggleStatus = (indicador, successCallback) => {
  showAlert({
    title: `¿Deseas cambiar el estado de '${indicador.nombre}'?`,
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
      console.log('RESPONSE', res)
      if (res) {
        showAlert({
          title: 'Estado actualizado exitosamente',
          text: `El estado de '${indicador.nombre}' ha sido actualizado.`,
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
    .finally(() => {
      if (typeof successCallback === 'function') {
        return successCallback();
      }
    })
}


const FormFiltro = lazy(() => import("../components/dashboard/forms/indicador/FormFiltro"))


const IndicadoresFilterDialog = (props) => {
  const [open, setOpen] = useState(false);
  const isMounted = useIsMounted();

  const handleClose = useCallback(() => {
    if (isMounted()) {
      setOpen(false)
    }
  }, [isMounted])

  return (<>
    <IconButton onClick={() => setOpen(true)}>
      <FilterAltIcon color={props.hasActiveFilters ? 'primary' : 'action'} />
    </IconButton>
    <Dialog
      open={open}
      fullWidth
      maxWidth='sm'
      onClose={handleClose}
      disableScrollLock
      keepMounted
    >
      <Suspense fallback={<Typography mx={4} my={2}>Cargando...</Typography>}>
        <FormFiltro
          handleClose={handleClose}
          submitCallback={props.submitCallback}
        />
      </Suspense>
    </Dialog>
  </>)
}


const FormIndicador = lazy(() => import("../components/dashboard/forms/indicador/FormIndicador").then(module => ({ default: module.FormIndicador })));


const NewIndicadorDialog = () => {
  const [open, setOpen] = useState(false);
  const handleClose = useCallback(() => setOpen(false), [])

  return (<>
    <Button startIcon={<AddIcon />} onClick={() => setOpen(true)} variant='outlined'>Agregar Indicador</Button>
    <Dialog open={open} fullWidth maxWidth='md' onClose={handleClose}>
      <Suspense fallback={<Typography mx={4} my={2}>Cargando...</Typography>}>
        <FormIndicador close={handleClose} />
      </Suspense>
    </Dialog>
  </>);
}