import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BeatLoader } from 'react-spinners';

import { useHistoricos, deleteHistorico } from '../../../../../../services/historicosService';
import DatagridTable from '../../../../common/DatagridTable';
import { DataHeader } from '../../../../common/DataHeader';
import { DataPagination } from '../../../../common/DataPagination';
import { ActualValue } from './ActualValue';
import { HistoricosGraph } from './HistoricosGraph';

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAlert } from '../../../../../../contexts/AlertContext';

import { useNavigate } from 'react-router-dom';

import './historicos.css';
import { useParams } from 'react-router-dom';

export const HistoricosView = () => {
  let perPage = localStorage.getItem('perPage') || 5;
  let totalPages = 1;
  let rowsHistoricos = [];

  const alert = useAlert();
  const { id } = useParams();

  const [perPaginationCounter, setPerPaginationCounter] = useState(perPage);
  const [paginationCounter, setPaginationCounter] = useState(1);
  const [order, setOrder] = useState('desc');
  const [sortBy, setSortBy] = useState('id');

  const [activeCounter, setActiveCounter] = useState(0);
  const [inactiveCounter, setInactiveCounter] = useState(0);

  const isMounted = useRef(true);
  const { historicosList, isLoading, isError } = useHistoricos(
    perPaginationCounter,
    paginationCounter,
    id,
    sortBy,
    order,
  );

  const [dataStore, setDataStore] = useState([]);

  const handleDelete = (id) => {
    deleteHistorico(id)
      .then(
        alert.success('Historico eliminado exitosamente.'))
      .catch(err => { console.log(err); });

  }

  if (activeCounter == 0 && inactiveCounter == 0 && historicosList) {
    setActiveCounter(historicosList.total - historicosList.totalInactivos);
    setInactiveCounter(historicosList.totalInactivos);
  }
  historicosList && (totalPages = historicosList.totalPages);
  historicosList && (rowsHistoricos = historicosList.data);

  let rowsHistoricosEdited = [];
  useMemo(() => {
    rowsHistoricos.map((data) => {
      rowsHistoricosEdited = [
        ...rowsHistoricosEdited,
        {
          ...data,
          fechaIngreso: data.fechaIngreso.split('T')[0],
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
            ...data,
            fechaIngreso: data.fechaIngreso.split('T')[0],
          },
        ];
      })
      setDataStore(rowsHistoricosEdited);
    }
  }, [historicosList]);

  const editable = false,
    headerClassName = "dt-theme--header",
    sortable = false,
    headerAlign = "center",
    align = "center",
    filterable = false;

  const columnHistoricos = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 0.1,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align,
      hide: true,
    },
    {
      field: 'valor',
      headerName: 'Valor',
      flex: 0.1,
      minWidth: 50,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align,
    },
    {
      field: 'fuente',
      headerName: 'Fuente',
      flex: 0.5,
      minWidth: 50,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align,
    },
    {
      field: "fechaIngreso",
      headerName: "Registro",
      flex: 0.1,
      minWidth: 100,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align,
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 0.3,
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
            <span className="dt-action-delete"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteForeverIcon />
            </span>
            <span
              className="dt-action-edit"
            >
              <ModeEditIcon />
            </span>
          </div>
        );
      },
    },
  ];

  const dataTable = [columnHistoricos, dataStore];
  return (
    <>
      <br />
      <Box className="dt-container">
        {
          isLoading ? (
            <Box>
              <BeatLoader size={15} color="#1976D2" />
            </Box>
          ) : (
            <>
              <DatagridTable data={dataTable} className='upper-panel' />
              <br />
              <Grid container className='bottom-panel'>
                <Grid item xs={12} md={6} className='bottom-panel-left'>
                  <Box className='left-item'>
                    <HistoricosGraph historicosData={dataTable[1]} />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} className='bottom-panel-right'>
                  <Box className='actual-value-container right-item'>
                    <ActualValue value={historicosList.indicadorLastValue} date={historicosList.indicadorLastUpdateDate} />
                  </Box>
                </Grid>
              </Grid>
              <DataPagination
                data={{
                  paginationCounter,
                  setPaginationCounter,
                  perPaginationCounter,
                  setPerPaginationCounter,
                  totalPages,
                  perPage,
                }}
              />
            </>
          )
        }
      </Box>
    </>
  )
}