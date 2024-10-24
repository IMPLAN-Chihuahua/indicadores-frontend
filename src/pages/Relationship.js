import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import DatagridTable from "../components/dashboard/common/DatagridTable";
import PageHeader from "../components/dashboard/common/DataHeader";
import { useIndicadorUsuarios } from "../services/usuarioIndicadorService";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import FormDialog from "../components/dashboard/common/FormDialog";
import FormRelationship from "../components/dashboard/forms/relationship/FormRelationship";
import { getGlobalPerPage } from "../utils/objects";
import { useNavigate } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { getIndicatorsGeneralInfo } from "../services/indicatorService";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { parseDate } from "../utils/dateParser";

export const Relationship = () => {
  const [searchIndicator, setSearchIndicator] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [indicador, setIndicador] = useState({});
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(getGlobalPerPage);
  const [total, setTotal] = useState(0);
  const [indicatorsQuantity, setIndicatorsQuantity] = useState(0);
  const [inactiveIndicators, setInactiveIndicators] = useState(0);
  const { indicadores, isLoading, mutate } = useIndicadorUsuarios(perPage, page, searchIndicator);
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  const fetchCount = () => {
    getIndicatorsGeneralInfo({
      attributes: ['activo']
    })
      .then(({ data }) => {
        setIndicatorsQuantity(data.total);
        const inactive = data.data.filter(({ activo }) => activo === 'NO').length;
        setInactiveIndicators(inactive);
      })
  };

  useEffect(() => {
    fetchCount();
  }, [indicatorsQuantity])


  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = (e) => {
    setOpenModal(true);
    if (e) {
      setIsEdit(true);
      setIndicador(e);
    } else {
      setIsEdit(false);
      setIndicador({});
    }
  };
  const handleCloseModal = () => setOpenModal(false);

  const [clickInfo, setClickInfo] = useState({
    row: { temaIndicador: "" },
  });

  useEffect(() => {
    if (!indicadores) {
      return;
    }
    setRows(indicadores.data);
    setTotal(indicadores.total);
  }, [indicadores]);

  const editable = true;
  const headerClassName = "";
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
      headerClassName,
      sortable,
      headerAlign: 'right',
      align: 'right',
      hide: true,
    },
    {
      field: "nombre",
      headerName: "Indicador",
      flex: 1,
      minWidth: 150,
      editable,
      headerClassName,
      sortable,
    },
    {
      field: "count",
      headerName: "Cantidad de usuarios asignados",
      flex: 0.5,
      minWidth: 150,
      editable,
      headerClassName,
      sortable,
      headerAlign: 'right',
      align: 'right',
    },
    {
      field: "owner",
      headerName: "Responsable del indicador",
      flex: 0.5,
      minWidth: 150,
      editable,
      headerClassName,
      sortable,
      renderCell: params => params.row.owner
    },

    {
      field: "updatedAt",
      headerName: "Fecha de modificación",
      flex: 0.5,
      minWidth: 100,
      editable,
      headerClassName,
      sortable,
      renderCell: params => parseDate(params.row.updatedAt)
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 0.5,
      editable: false,
      minWidth: 120,
      headerClassName,
      sortable,
      headerAlign,
      align,
      filterable,
      renderCell: params => (
        <Stack direction='row'>
          <Tooltip title={`Agregar usuarios responsables a ${params.row.nombre}`}>
            <IconButton onClick={() => handleOpenModal(params.row)}>
              <GroupAddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={`Ver usuarios asignados a ${params.row.nombre}`}>
            <IconButton
              sx={{ border: 1, borderColor: 'divider' }}
              onClick={() => navigate(`/autorizacion/indicador/${params.id}`, [navigate])}
            >
              <NavigateNextIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      )
    },
  ];

  const dataIndicator = {
    topic: "registro",
    countEnable: indicatorsQuantity || 0,
    countDisable: inactiveIndicators || 0,
    setSearch: setSearchIndicator,
    searchValue: searchIndicator
  };

  return (
    <Box display='flex' flexDirection='column' p={2} height='100%'>
      <PageHeader
        data={dataIndicator}
        handleOpenModal={() => handleOpenModal()}
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
        maxWidth={'lg'}
      >
        <FormRelationship data={clickInfo} handleCloseModal={handleCloseModal} mutate={mutate} isEdit={isEdit} indicador={indicador} />
      </FormDialog>
    </Box>
  );
};
