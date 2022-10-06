import { Button, Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BeatLoader } from 'react-spinners';

import { useHistoricos, deleteHistorico } from '../../../../../../services/historicosService';
import DatagridTable from '../../../../common/DatagridTable';
import { ActualValue } from './ActualValue';
import { HistoricosGraph } from './HistoricosGraph';

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import './historicos.css';
import { useParams } from 'react-router-dom';

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

  const isMounted = useRef(true);
  const { historicosList, isLoading, isError } = useHistoricos(
    perPaginationCounter,
    paginationCounter,
    id,
    sortBy,
    order,
  );

  const handleDeleteHistorico = (idHistorico) => {
    deleteHistorico(idHistorico);
    window.location.reload();
  }

  const handleClickInfo = (data) => {
    console.log(data);
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
      field: 'id',
      headerName: 'ID',
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
                  // setOpenModal((prev) => !prev);
                  handleClickInfo(params.row);
                }}
              >
                <DeleteForeverIcon />
              </span>
            }
            <span
              className="dt-action-edit"
              onClick={() => {
                // setOpenModal((prev) => !prev);
                // setClickInfo(params.row);
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
          <Box>
            <BeatLoader size={15} color="#1976D2" />
          </Box>
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
              <Button variant='contained'>
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
          </>
        )
      }
    </>
  )
}