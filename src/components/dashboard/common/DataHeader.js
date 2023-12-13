import { Box, Button, Grid, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import React, { useState, useEffect, useMemo, useRef } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import debounce from 'lodash.debounce';
import './common.css'

export const DataHeader = ({ data, handleOpenModal }) => {
  const { topic, countEnable, countDisable, setSearch, searchValue } = data;
  const textRef = useRef(null)
  const [showClear, setShowClear] = useState(false)

  const handleInputClear = () => {
    textRef.current.value = '';
    setSearch("")
  }
  const handleInputChange = (e) => {
    setSearch(e.target.value)
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
    </Box>
  )
}
