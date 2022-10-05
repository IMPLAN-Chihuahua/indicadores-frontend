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
          },
        ];
      })
    }
  }, [historicosList]);

  return (
    <>
      <br />
      {
        isLoading ? (
          <Box>
            <BeatLoader size={15} color="#1976D2" />
          </Box>
        ) : (
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
        )
      }

      {/* <Box className="dt-container">
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
      </Box> */}
    </>
  )
}