import { Badge, Box, Button, Dialog, Grid, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import React, { useState, useEffect, useMemo, useRef } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import debounce from 'lodash.debounce';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import './common.css'
import FormFiltro from '../forms/indicador/FormFiltro';

export const DataHeader = ({ data, handleOpenModal }) => {
  const { countEnable, countDisable, setSearch, setObjetivo, setOwner, searchIndicator } = data;

  const textRef = useRef(null)
  const [showClear, setShowClear] = useState(false)
  const [searching, setSearching] = useState(false)
  const [filter, setFilter] = useState(false)

  const [openAdvancedSearch, setOpenAdvancedSearch] = useState(false)

  const handleClose = () => {
    setOpenAdvancedSearch(false)
  }

  const handleInputClear = () => {
    textRef.current.value = '';
    setSearch("");
    setSearching(false);
    setFilter(false);
  }
  const handleInputChange = (e) => {
    setSearch(e.target.value);
    setSearching(true);
  }
  const debounceInputChange = useMemo(() =>
    debounce(handleInputChange, 300)
    , [])

  useEffect(() => {
    return () => {
      debounceInputChange.cancel()
    }
  }, [])

  return (
    <Box position='sticky' maxWidth='100%' mb={2} overflow='hide'>
      <Paper component={Grid} container pb={2} pt={2} variant='outlined'>
        <Grid item xs={12} md={3} className='dh-counters'>
          <Box className='dh-count'>
            <Box className='dh-count-container'>
              <Box className='dh-count-number'>
                {countEnable}
              </Box>
              <Box className='dh-count-text'>
                Activos
              </Box>
            </Box>
          </Box>

          <Box className='dh-count'>
            <Box className='dh-count-container'>
              <Box className='dh-count-number'>
                {countDisable}
              </Box>
              <Box className='dh-count-text'>
                Inactivos
              </Box>
            </Box>
          </Box>

        </Grid>
        <Grid item xs className='dh-search'>
          <TextField
            className='dh-search-input'
            type='text'
            inputRef={textRef}
            onChange={debounceInputChange}
            onFocus={() => { setShowClear(true) }}
            onBlur={() => { setShowClear(false) }}
            placeholder='Buscar'
            variant='standard'
            autoComplete='off'
            InputProps={{
              startAdornment:
                <InputAdornment position='start'><SearchIcon /></InputAdornment>,
              endAdornment:
                <>
                  {searching &&
                    (
                      <IconButton onClick={handleInputClear} >
                        <ClearIcon />
                      </IconButton>
                    )}
                  <IconButton
                    onClick={() => {
                      setOpenAdvancedSearch(!openAdvancedSearch)
                    }}
                    title='Búsqueda avanzada'
                  >
                    <FilterAltIcon sx={{
                      color: filter ? 'secondary.main' : 'inherit'
                    }} />
                  </IconButton>
                </>
            }}
          />
        </Grid>
        <Grid item xs={12} md={3} className='dh-options'>
          <Button
            variant='contained'
            className='dh-options-button'
            sx={{ lineHeight: '15px' }}
            onClick={handleOpenModal}
          >
            <AddIcon />Agregar
          </Button>
        </Grid>
      </Paper>

      <Dialog
        open={openAdvancedSearch}
        sx={{ maxWidth: '1000px', margin: 'auto' }}
        disableScrollLock
        keepMounted>
        <FormFiltro
          handleClose={handleClose}
          searchIndicator={searchIndicator}
          setObjetivo={setObjetivo}
          setSearch={setSearch}
          setOwner={setOwner}
          setFilter={setFilter}
        />
      </Dialog>
    </Box>
  )
}
