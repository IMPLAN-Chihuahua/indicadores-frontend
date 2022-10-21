import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { InputAdornment, TextField } from '@mui/material';
import debounce from 'lodash.debounce';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useIndicators, useSelector } from '../../../services/userService';
import { DataContext } from './DataContext';
import { useAlert } from '../../../contexts/AlertContext';
import PersonalLoader from '../PersonalLoader/PersonalLoader';

const columns = [
  { id: 'id', label: '#', minWidth: 25 },
  { id: 'name', label: 'Nombre', minWidth: 50 },
  { id: 'action', label: 'Asignar', minWidth: 5 },
];

const createData = (id, name, action) => {
  return { id, name, action };
}

export const DataSelectorTable = ({ topic }) => {
  const { dataList, dispatch } = React.useContext(DataContext);
  const alert = useAlert();
  const handleToList = (object) => {
    const exist = dataList.find(item => item.id === object.id)
    if (exist === undefined) {
      dispatch({
        type: 'add',
        payload: object
      })
    } else {
      alert.warning('Ya está asignado')
    }

  }
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  let rowsTopic = [];
  let rows = [];
  let totalRows = 0;


  const { itemList, isLoading, isError } = useSelector(
    topic,
    rowsPerPage,
    page + 1,
    search
  );
  itemList && (totalRows = itemList.total)
  itemList && (rowsTopic = itemList.data);

  if (topic === 'Indicadores') {
    rowsTopic.forEach(({ id, nombre }) => {
      rows = [...rows, createData(
        id,
        <div className='ds-col-2'>
          <span className='ds-name'>
            {nombre}
          </span>
        </div>
        ,
        <div className='ds-col-3'>
          <button className='ds-btn-selection' onClick={(e) => {
            e.preventDefault();
            handleToList({
              id,
              nombre,
            })
          }}>
            <ArrowRightIcon sx={{ fontSize: '35px', color: 'white' }} />
          </button>
        </div>)]
    });
  } else {
    rowsTopic.forEach(({ id, nombres, apellidoPaterno, apellidoMaterno }) => {
      rows = [...rows, createData(
        id,
        <div className='ds-col-2'>
          <span className='ds-name'>
            {nombres} {apellidoPaterno} {apellidoMaterno}
          </span>
        </div>
        ,
        <div className='ds-col-3'>
          <button className='ds-btn-selection' onClick={(e) => {
            e.preventDefault();
            handleToList({
              id,
              nombres: `${nombres} ${apellidoPaterno} ${apellidoMaterno}`,
            })
          }}>
            <ArrowRightIcon sx={{ fontSize: '35px', color: 'white' }} />
          </button>
        </div>)]
    });

  }


  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const textRef = React.useRef(null)
  const [showClear, setShowClear] = React.useState(false)

  const handleInputClear = () => {
    textRef.current.value = '';
    setSearch("")
    setPage(1)
  }
  const handleInputChange = (e) => {
    setSearch(e.target.value)
    setPage(0)
  }
  const debounceInputChange = React.useMemo(() =>
    debounce(handleInputChange, 300)
    , [])

  React.useEffect(() => {
    return () => {
      debounceInputChange.cancel()
    }
  }, [])



  return (
    <>
      <div className='dst-container'>

        <div className='ds-search'>

          <TextField
            className='ds-search-input'
            type='text'
            inputRef={textRef}
            onChange={debounceInputChange}
            onFocus={() => { setShowClear(true) }}
            onBlur={() => { setShowClear(false) }}
            placeholder={`Buscar...`}
            variant='standard'
            autoComplete='off'
            InputProps={{
              startAdornment:
                <InputAdornment position='start'><SearchIcon /></InputAdornment>,
              endAdornment: (
                <span style={{
                  color: 'gray',
                  cursor: 'pointer',
                  opacity: showClear ? 1 : 0
                }}
                  onClick={handleInputClear}>
                  <ClearIcon />
                </span>
              ),
            }}
          />
        </div>

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          {
            (isLoading)
              ?
              <PersonalLoader />
              :
              (rows.length > 0)
                ?
                <>
                  <TableContainer sx={{ maxHeight: 233 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead className='ds-table-header'>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ minWidth: column.minWidth, textAlign: 'left', fontWeight: '600' }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody className='dst-table-body'>
                        {rows.map((row) => (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.id}
                          >
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[3, 5, 10]}
                    component="div"
                    count={totalRows}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </>
                :
                <div>
                  <br />
                  <p className='ds-no-content'>No se encontro informacion</p>
                  <br />
                </div>
          }

        </Paper>
      </div>
    </>
  );
}
