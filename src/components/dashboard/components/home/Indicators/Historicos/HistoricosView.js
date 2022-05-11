import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BeatLoader } from 'react-spinners';

import { useHistoricos } from '../../../../../../services/historicosService';
import DatagridTable from '../../../../common/DatagridTable';
import { DataHeader } from '../../../../common/DataHeader';
import { DataPagination } from '../../../../common/DataPagination';
import { ActualValue } from './ActualValue';
import { HistoricosGraph } from './HistoricosGraph';

import './historicos.css';
import { useParams } from 'react-router-dom';

export const HistoricosView = () => {

  let perPage = localStorage.getItem('perPage') || 5;
  let totalPages = 1;
  let rowsHistoricos = [];

  const { id } = useParams();

  const [searchHistorico, setSearchHistorico] = useState("");
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

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [clickInfo, setClickInfo] = React.useState({
    row: { temaIndicador: "" },
  });

  const [removeOpenModal, setRemoveOpenModal] = useState(false);
  const handleRemoveOpenModal = () => setRemoveOpenModal(true);
  const handleRemoveCloseModal = () => setRemoveOpenModal(false);

  const [changeData, setChangeData] = useState({});
  const [dataStore, setDataStore] = useState([]);

  const handleStatus = (id, topic, element, type) => {
    setChangeData({
      id,
      topic,
      element,
      type
    });
    handleRemoveOpenModal();
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
          createdAt: data.createdAt.split('T')[0],
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
            createdAt: data.createdAt.split('T')[0],
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
      field: 'anio',
      headerName: 'Año',
      flex: 0.2,
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
      field: "createdAt",
      headerName: "Creacion",
      flex: 0.1,
      minWidth: 100,
      editable,
      headerClassName,
      sortable,
      headerAlign,
      align,
    }
  ];

  const dataTable = [columnHistoricos, dataStore];

  const dataHistoricos = {
    topic: "Historico",
    countEnable: 100,
    countDisable: 10,
    setSearch: setSearchHistorico,
    searchValue: searchHistorico
  };

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
              <DatagridTable data={dataTable} />
              <br />
              <Grid container className='bottom-panel'>
                <Grid item xs={12} md={6}>
                  <HistoricosGraph historicosData={dataTable[1]} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <ActualValue value={historicosList.indicadorLastValue} date={historicosList.indicadorLastUpdateDate} />
                </Grid>
              </Grid>
              <DataPagination
                data={{
                  dataHistoricos,
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