import { useState } from "react";
import DatagridTable from "../components/dashboard/common/DatagridTable";
import PageHeader from "../components/dashboard/common/DataHeader";
import { Status } from "../components/dashboard/common/Status";
import FormDialog from "../components/dashboard/common/FormDialog";
import FormTemaInteres, { FORM_TEMA_ACTIONS } from "../components/dashboard/forms/model/FormTemaInteres";
import { toggleTemaStatus, useTemas } from "../services/temaService";
import { getGlobalPerPage } from "../utils/objects";
import { Avatar, Box, Button, DialogTitle, IconButton, Stack, Typography } from "@mui/material";
import { parseDate } from "../utils/dateParser";
import EditIcon from '@mui/icons-material/Edit';
import { showAlert } from "../utils/alert";
import SearchInput from "../components/dashboard/common/SearchInput";
import RefreshIcon from '@mui/icons-material/Refresh';
import useQueryParams from "../hooks/useQueryParams";
import AddIcon from '@mui/icons-material/Add';


export const Temas = () => {
  const { updatePage, updatePerPage, updateSearchQuery, params } = useQueryParams(temasParamsInitialState)
  const { page, perPage, searchQuery, } = params;
  const { temas, isLoading, hasError, mutate, total } = useTemas({ page, perPage, searchQuery })

  const [selectedTema, setSelectedTema] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [formTemaAction, setFormTemaAction] = useState(null);

  const handleCloseModal = async () => {
    setOpenModal(false)
    setSelectedTema(null)
    mutate()
  }

  const handleEdit = (tema) => {
    setOpenModal(true)
    setFormTemaAction(FORM_TEMA_ACTIONS.EDIT)
    setSelectedTema(tema)
  }

  const handleNew = () => {
    setSelectedTema(null)
    setOpenModal(true)
    setFormTemaAction(FORM_TEMA_ACTIONS.NEW)
  }

  const columns = [
    {
      field: "id",
      headerName: "ID ",
      flex: 0.1,
      hide: true,
    },
    {
      field: "codigo",
      headerName: "Código",
      flex: 0.2,
      minWidth: 50,
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: "urlImagen",
      headerName: "Imagen",
      flex: 0.2,
      minWidth: 100,
      cellClassName: 'cell-overflow',
      headerAlign: 'left',
      align: 'left',
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <Box className='latest-picture'>
            <Avatar
              className='latest-picture-hoverable'
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
      flex: 0.5,
      minWidth: 150,
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: "color",
      headerName: "Color",
      flex: 0.2,
      minWidth: 80,
      editable: false,
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
      field: "descripcion",
      headerName: "Descripción",
      flex: 1,
      minWidth: 200,
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: "activo",
      headerName: "Estado",
      flex: 0.2,
      editable: false,
      minWidth: 100,
      sortable: false,
      headerAlign: 'left',
      align: 'left',
      renderCell: params => (
        <Status
          handleClick={() => toggleStatus(params.row, mutate)}
          status={params.row.activo}
        />)
    },
    {
      field: "createdAt",
      headerName: "Creación",
      flex: 1,
      minWidth: 100,
      editable: false,
      hide: true,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => (<Typography noWrap>
        {parseDate(params.row.createdAt)}
      </Typography>)
    },
    {
      field: "updatedAt",
      headerName: "Edición",
      flex: 1,
      minWidth: 100,
      editable: false,
      hide: true,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => (<Typography noWrap>
        {parseDate(params.row.updatedAt)}
      </Typography>)
    },
    {
      field: "editar",
      headerName: "Editar",
      flex: 0.2,
      editable: false,
      minWidth: 100,
      renderCell: params => (
        <Stack direction='row'>
          <IconButton aria-label='editar' onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Box display='flex' flexDirection='column' p={2} height='100%'>
      <PageHeader
        title='Temas'
        SearchBar={<SearchInput onDebouncedChange={updateSearchQuery} />}
      >
        <Button
          variant="outlined"
          onClick={() => mutate()}
          color="primary"
        >
          <RefreshIcon />
        </Button>
        <Button variant='outlined' startIcon={<AddIcon />} onClick={handleNew}>Agregar Tema</Button>
      </PageHeader>
      <div className='datagrid-container'>
        <DatagridTable
          rows={temas}
          columns={columns}
          page={page}
          perPage={perPage}
          total={total}
          isLoading={isLoading}
          handlePageSizeChange={updatePerPage}
          handlePageChange={updatePage}
        />
      </div>
      <FormDialog
        open={openModal}
        handleClose={handleCloseModal}
      >
        <DialogTitle>{formTemaAction} Tema de Interés</DialogTitle>
        <FormTemaInteres action={formTemaAction} selectedTema={selectedTema} handleCloseModal={handleCloseModal} />
      </FormDialog>
    </Box>
  );
};


const temasParamsInitialState = () => {
  return {
    page: 1,
    perPage: getGlobalPerPage(),
    searchQuery: '',
    hasActiveFilters: false,
    filters: null
  }
}


const toggleStatus = (tema, onSuccessCallback) => {
  showAlert({
    title: `¿Deseas cambiar el estado de ${tema.temaIndicador}?`,
    text: `Al actualizar este registro, el estado del tema se alternará, 
    es decir, si se encuentra ACTIVO pasará a estar INACTIVO y viceversa.`,
    icon: 'warning',
    showCancelButton: true
  }).then(async option => {
    if (option.isConfirmed) {
      const toggled = await toggleTemaStatus(tema.id)
      return toggled
    }
  })
    .then(res => {
      if (res) {
        showAlert({
          title: 'Estado actualizado exitosamente',
          text: `El estado de ${tema.temaIndicador} ha sido actualizado.`,
          icon: 'success'
        });
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
      if (typeof onSuccessCallback === 'function') {
        return onSuccessCallback();
      }
    })
}