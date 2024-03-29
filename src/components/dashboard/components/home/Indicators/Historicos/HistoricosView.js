import { Button, Container, Grid, IconButton, Paper, Stack } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useHistoricos, deleteHistorico } from '../../../../../../services/historicosService';
import DatagridTable from '../../../../common/DatagridTable';
import { ActualValue } from './ActualValue';
import { HistoricosGraph } from './HistoricosGraph';
import './historicos.css';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import FormDialog from '../../../../common/FormDialog';
import FormHistoricos from './FormHistoricos';
import PersonalLoader from '../../../../../common/PersonalLoader/PersonalLoader';
import { getGlobalPerPage } from '../../../../../../utils/objects';
import useIsMounted from '../../../../../../hooks/useIsMounted';
import { showAlert } from '../../../../../../utils/alert';

export const HistoricosView = () => {
  const { id } = useParams();
  let rowsHistoricos = [];
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(getGlobalPerPage);
  const isMounted = useIsMounted();

  const [order, setOrder] = useState('desc');
  const [sortBy, setSortBy] = useState('id');
  const [clickInfo, setClickInfo] = useState([]);
  const [total, setTotal] = useState(0);
  const [rows, setRows] = useState([]);


  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true)
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const { historicosList, isLoading, mutate } = useHistoricos(
    perPage,
    page,
    id,
    sortBy,
    order,
  );


  useEffect(() => {
    if (!historicosList) {
      return;
    }
    if (isMounted()) {
      setRows(historicosList.data);
      setTotal(historicosList.total);
    }
  }, [historicosList, isMounted]);

  const handleDeleteHistorico = ({ id }) => {
    showAlert({
      title: '¿Deseas eliminar este valor histórico?',
      text: 'Al eliminar este registro, dejará de ser visible en la tabla de valores históricos de Chihuahua Métrica y en el sistema de gestión de Chihuahua en Datos.',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: 'white',
      customConfirmButtonColor: 'var(--danger-main)',
      customCancelButtonText: 'Cancelar, conservar registro',
      confirmButtonText: 'Aceptar, eliminar registro',
    }).then((option) => {
      if (option.isConfirmed) {
        return deleteHistorico(id);
      }
    })
      .then(res => {
        if (res) {
          Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success');
          mutate();
        }
      })
      .catch(err => {
        showAlert({
          title: 'Hubo un error',
          text: err,
          icon: 'error'
        })
      });
  }

  historicosList && (rowsHistoricos = historicosList.data);

  let rowsHistoricosEdited = [];
  useMemo(() => {
    rowsHistoricos.map((data) => {
      rowsHistoricosEdited = [
        ...rowsHistoricosEdited,
        {
          id: data.id,
          anio: data.anio,
          valor: data.valor,
          fuente: data.fuente,
        },
      ];
    })
  });

  useEffect(() => {
    if (historicosList) {
      let rowsHistoricosEdited = [];
      rowsHistoricos.map((data) => {
        rowsHistoricosEdited = [
          ...rowsHistoricosEdited,
          {
            id: data.id,
            anio: data.anio,
            valor: data.valor,
            fuente: data.fuente,
          },
        ];
      })
    }
  }, [historicosList]);

  const sortable = true;

  const columns = [
    {
      field: 'anio',
      headerName: 'Año de referencia',
      flex: 0.5,
      sortable,
      headerAlign: 'right',
      align: 'right'
    },
    {
      field: 'valor',
      headerName: 'Valor',
      flex: 1,
      minWidth: 80,
      headerAlign: 'right',
      align: 'right'
    },
    {
      field: 'fuente',
      headerName: 'Fuente',
      flex: 1,
      minWidth: 80,
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 0.5,
      editable: false,
      minWidth: 100,
      sortable,
      headerAlign: 'center',
      align: 'center',
      filterable: false,
      renderCell: params => (
        <Stack direction='row'>
          <IconButton aria-label='eliminar historico' onClick={() => handleDeleteHistorico(params.row)}>
            <DeleteForeverIcon />
          </IconButton>
          <IconButton aria-label='editar historico' onClick={() => {
            handleOpenModal();
            setClickInfo({ type: 1, ...params.row });
          }}>
            <EditIcon />
          </IconButton>
        </Stack>
      )
    },
  ]

  if (isLoading) {
    return <PersonalLoader />
  }

  return (
    <>
      <Box
        p={3}
        display='flex'
        flexDirection='column'
        sx={{
          flex: '1 1 auto',
          overflowY: 'scroll',
          height: '500px'
        }}>
        <Grid container columnGap={2}>
          <Paper component={Grid} item xs={12} md={6} elevation={1} p={1}>
            {
              historicosList.data.length > 0 && (
                <HistoricosGraph
                  historicosData={historicosList.data}
                  ultimoValor={historicosList.indicadorLastValue}
                  ultimaFecha={historicosList.indicadorLastUpdateDate}
                />
              )
            }
          </Paper>
          <Paper
            component={Grid}
            item
            xs={12}
            md
            elevation={1}
            alignItems='center'
          >
            <ActualValue value={historicosList.indicadorLastValue} date={historicosList.indicadorLastUpdateDate} />
          </Paper>
        </Grid>
        <Box mt={1} mb={1} ml='auto'>
          <Button
            variant='contained'
            onClick={() => {
              handleOpenModal();
              setClickInfo({ type: 2 });
            }}
          >
            Agregar histórico
          </Button>
        </Box>
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
      </Box>
      <FormDialog
        open={openModal}
        handleClose={() => setOpenModal(false)}
      >
        <FormHistoricos
          type={clickInfo.type}
          id={clickInfo.id}
          anio={clickInfo.anio}
          valor={clickInfo.valor}
          fuente={clickInfo.fuente}
          handleCloseModal={handleCloseModal}
          mutate={mutate}
        />
      </FormDialog>
    </>
  )
}