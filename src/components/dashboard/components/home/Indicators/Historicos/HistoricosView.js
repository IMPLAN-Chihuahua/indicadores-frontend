import { Button, Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { useHistoricos, deleteHistorico } from '../../../../../../services/historicosService';
import DatagridTable from '../../../../common/DatagridTable';
import { ActualValue } from './ActualValue';
import { HistoricosGraph } from './HistoricosGraph';

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import './historicos.css';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import FormDialog from '../../../../common/FormDialog';
import FormHistoricos from './FormHistoricos';
import PersonalLoader from '../../../../../common/PersonalLoader/PersonalLoader';

export const HistoricosView = () => {
  let perPage = localStorage.getItem('perPage') || 5;
  let totalPages = 1;
  let rowsHistoricos = [];

  const { id } = useParams();

  const [perPaginationCounter, setPerPaginationCounter] = useState(perPage);
  const [paginationCounter, setPaginationCounter] = useState(1);
  const [order, setOrder] = useState('desc');
  const [sortBy, setSortBy] = useState('id');
  const [clickInfo, setClickInfo] = useState([]);


  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true)
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const isMounted = useRef(true);
  const { historicosList, isLoading, isError, mutate } = useHistoricos(
    perPaginationCounter,
    paginationCounter,
    id,
    sortBy,
    order,
  );

  const handleDeleteHistorico = ({ id }) => {
    Swal.fire({
      title: '¿Deseas eliminar este valor histórico?',
      text: 'Al eliminar este registro, dejará de ser visible en la tabla de valores históricos de Chihuahua Métrica y en el sistema de gestión de Chihuahua en Datos.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F14156',
      cancelButtonColor: '#B7BFCC',
      cancelButtonText: '<div style="color: #7A7A7A; font-weight: 600; font-family: sans-serif">Cancelar, conservar registro</div>',
      confirmButtonText: '<div style="font-weight: 500; font-family: sans-serif">Aceptar, eliminar registro</div>',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteHistorico(id);
        Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success');
        mutate();
      }
    });
  }

  historicosList && (totalPages = historicosList.totalPages);
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
    return () => {
      isMounted.current = false;
    };
  }, []);

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

  const editable = true;
  const headerClassName = "dt-theme--header";
  const sortable = true;
  const headerAlign = "center";
  const align = "center";
  const filterable = false;

  const columns = [
    {
      field: 'anio',
      headerName: 'Año de referencia',
      flex: 0.5,
      headerClassName,
      sortable,
      headerAlign,
      align
    },
    {
      field: 'valor',
      headerName: 'Valor',
      flex: 1,
      minWidth: 80,
      headerClassName,
      headerAlign,
      align
    },
    {
      field: 'fuente',
      headerName: 'Fuente',
      flex: 1,
      minWidth: 80,
      headerClassName,
      headerAlign,
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
              <span
                className="dt-action-delete"
                onClick={() => {
                  handleDeleteHistorico(params.row);
                }}
              >
                <DeleteForeverIcon />
              </span>
            }
            <span
              className="dt-action-edit"
              onClick={() => {
                handleOpenModal();
                setClickInfo({ type: 1, ...params.row });
              }}
            >
              <ModeEditIcon />
            </span>
          </div>
        );
      },
    },
  ]

  return (
    <>
      <br />
      {
        isLoading ? (
          <PersonalLoader />
        ) : (
          <>
            <Grid container className='bottom-panel'>
              <Grid item xs={12} md={6} className='bottom-panel-left'>
                <Box className='left-item'>
                  <HistoricosGraph historicosData={historicosList.data} ultimoValor={historicosList.indicadorLastValue} ultimaFecha={historicosList.indicadorLastUpdateDate} />
                </Box>
              </Grid>
              <Grid item xs={12} md={6} className='bottom-panel-right'>
                <Box className='actual-value-container right-item'>
                  <ActualValue value={historicosList.indicadorLastValue} date={historicosList.indicadorLastUpdateDate} />
                </Box>
              </Grid>
            </Grid>
            <br />
            <Box className='add-historico'>
              <Button variant='contained' onClick={() => { handleOpenModal(); setClickInfo({ type: 2 }); }}>
                Agregar histórico
              </Button>
            </Box>
            <DatagridTable
              page={historicosList.page}
              columns={columns}
              rows={rowsHistoricosEdited}
              perPage={historicosList.perPage}
              total={historicosList.total}
              isLoading={isLoading}
            />

            <FormDialog
              open={openModal}
              setOpenModal={setOpenModal}
            >
              <FormHistoricos type={clickInfo.type} id={clickInfo.id} anio={clickInfo.anio} valor={clickInfo.valor} fuente={clickInfo.fuente} handleCloseModal={handleCloseModal} mutate={mutate} />
            </FormDialog>
          </>
        )
      }
    </>
  )
}