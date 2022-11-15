import { useState, useEffect } from "react";
import DatagridTable from "../components/dashboard/common/DatagridTable";
import { DataHeader } from "../components/dashboard/common/DataHeader";
import { useModules } from "../services/userService";
import { Status } from "../components/dashboard/common/Status";
import FormDialog from "../components/dashboard/common/FormDialog";
import FormModel, { FORM_TEMA_ACTIONS } from "../components/dashboard/forms/model/FormModel";
import { toggleTemaStatus } from "../services/moduleService";
import { getGlobalPerPage } from "../utils/objects";
import { Avatar, Box, DialogTitle, IconButton, Stack, Typography } from "@mui/material";
import { parseDate } from "../utils/dateParser";
import EditIcon from '@mui/icons-material/Edit';
import { showAlert } from "../utils/alert";

export const Modules = () => {
  const [searchModule, setSearchModule] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [perPage, setPerPage] = useState(getGlobalPerPage);

  const { temas, isLoading, hasError, mutate } = useModules(perPage, page, searchModule);

  const [selectedTema, setSelectedTema] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [formTemaAction, setFormTemaAction] = useState('');

  const [rows, setRows] = useState([]);

  const toggleStatus = (tema) => {
    showAlert({
      title: `¿Deseas cambiar el estado de ${tema.temaIndicador}?`,
      text: `Al actualizar este registro, el estado del tema se alternará, 
      es decir, si se encuentra ACTIVO pasará a estar INACTIVO y viceversa.`,
      icon: 'warning',
      showCancelButton: true
    }).then(option => {
      if (option.isConfirmed) {
        return toggleTemaStatus(tema.id)
      }
    })
      .then(res => {
        if (res) {
          showAlert({
            title: 'Estado actualizado exitosamente',
            text: `El estado de ${tema.temaIndicador} ha sido actualizado.`,
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
  const handleCloseModal = async () => {
    setOpenModal(false)
    setSelectedTema(null)
    await mutate()
  }

  const handleEdit = (tema) => {
    setOpenModal(true)
    setFormTemaAction(FORM_TEMA_ACTIONS.EDIT)
    setSelectedTema(tema)
  }

  const handleNew = () => {
    setOpenModal(true)
    setFormTemaAction(FORM_TEMA_ACTIONS.NEW)
  }

  useEffect(() => {
    if (!temas) {
      return;
    }
    setRows(temas.data);
    setTotal(temas.total);
  }, [temas]);

  const editable = true;
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
      sortable,
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: "urlImagen",
      headerName: "Imagen",
      flex: 0.2,
      minWidth: 100,
      editable,
      cellClassName: 'cell-overflow',
      headerAlign: 'left',
      align: 'left',
      sortable: false,
      filterable: false,
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
      flex: 0.5,
      minWidth: 150,
      editable,
      sortable,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => <Typography noWrap>{params.row.temaIndicador}</Typography>
    },
    {
      field: "createdAt",
      headerName: "Creación",
      flex: 1,
      minWidth: 100,
      editable: false,
      sortable,
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
      sortable,
      hide: true,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => (<Typography noWrap>
        {parseDate(params.row.updatedAt)}
      </Typography>)
    },
    {
      field: "color",
      headerName: "Color",
      flex: 0.2,
      minWidth: 80,
      editable: false,
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
      field: "descripcion",
      headerName: "Descripción",
      flex: 1,
      minWidth: 200,
      editable,
      sortable,
      headerAlign: 'left',
      align: 'left',
      renderCell: params => <Typography noWrap>{params.row.descripcion}</Typography>
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
          handleClick={() => toggleStatus(params.row)}
          status={params.row.activo}
        />)
    },
    {
      field: "editar",
      headerName: "Editar",
      flex: 0.2,
      editable: false,
      minWidth: 100,
      sortable,
      headerAlign,
      align,
      filterable,
      renderCell: params => (
        <Stack direction='row'>
          <IconButton aria-label='editar' onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const dataModule = {
    topic: "modulo",
    countEnable: Math.abs(temas?.total - temas?.totalInactivos) || 0,
    countDisable: temas?.totalInactivos || 0,
    setSearch: setSearchModule,
    searchValue: searchModule
  };
  return (
    <>
      <DataHeader
        data={dataModule}
        handleOpenModal={handleNew}
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
        handleClose={handleCloseModal}
      >
        <DialogTitle>{formTemaAction} Tema de Interés</DialogTitle>
        <FormModel action={formTemaAction} selectedTema={selectedTema} handleCloseModal={handleCloseModal} />
      </FormDialog>
    </>
  );
};
