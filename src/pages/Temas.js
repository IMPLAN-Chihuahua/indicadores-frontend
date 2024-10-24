import { useState, useEffect } from "react";
import DatagridTable from "../components/dashboard/common/DatagridTable";
import PageHeader from "../components/dashboard/common/DataHeader";
import { useTemas } from "../services/userService";
import { Status } from "../components/dashboard/common/Status";
import FormDialog from "../components/dashboard/common/FormDialog";
import FormTemaInteres, { FORM_TEMA_ACTIONS } from "../components/dashboard/forms/model/FormTemaInteres";
import { getTemasGeneralInfo, toggleTemaStatus } from "../services/temaService";
import { getGlobalPerPage } from "../utils/objects";
import { Avatar, Box, DialogTitle, IconButton, Stack, Typography } from "@mui/material";
import { parseDate } from "../utils/dateParser";
import EditIcon from '@mui/icons-material/Edit';
import { showAlert } from "../utils/alert";
import { useAuth } from "../contexts/AuthContext";
import { isAdmin } from "../utils/userValidator";

export const Temas = () => {
  const [searchTema, setSearchTema] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [perPage, setPerPage] = useState(getGlobalPerPage);


  const { temas, isLoading, hasError, mutate } = useTemas(perPage, page, searchTema);

  const [selectedTema, setSelectedTema] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [formTemaAction, setFormTemaAction] = useState('');
  const [temaQuantity, setTemasQuantity] = useState(0);
  const [inactiveTemas, setInactiveTemas] = useState(0);

  const [rows, setRows] = useState([]);
  const { user } = useAuth();


  const fetchCount = () => {
    getTemasGeneralInfo({
      attributes: ['activo']
    })
      .then(({ data }) => {
        setTemasQuantity(data.total);
        const inactive = data.data.filter(({ activo }) => activo === false).length;
        setInactiveTemas(inactive);
      })
  };

  useEffect(() => {
    fetchCount();
  }, [temaQuantity])

  const toggleStatus = (tema) => {
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
          fetchCount();
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
      flex: 0.2,
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
      editable,
      sortable,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => <Typography noWrap>{params.row.temaIndicador}</Typography>
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
    isAdmin(user) &&
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

  return (
    <Box display='flex' flexDirection='column' p={2} height='100%'>
      <PageHeader
        title='Temas'
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
        <FormTemaInteres action={formTemaAction} selectedTema={selectedTema} handleCloseModal={handleCloseModal} />
      </FormDialog>
    </Box>
  );
};
