import { Box, Button, Grid, InputAdornment, TextField } from '@mui/material'
import React, {useState, useEffect} from 'react'
import './common.css'
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
export const DataHeader = ({data}) => {
        const {topic, countEnable , countDisable} = data;
        const[formState,setFormState] = useState({
                search:'',
        })
       
        const {search} = formState;

        const handleInputChange = ({target}) => {
                setFormState({
                ...formState,
                [target.name]: target.value,
                })
        }

        const handleInputClear = () => {
                setFormState({
                        search: '',
                })
        }



        return (
      <>
    <Grid container className='dh-container'>
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
       <Grid item xs={12} md={6} className='dh-search'>
        <TextField 
        className='dh-search-input'
        type='text'
        name='search'
        value={search}
        onChange={handleInputChange}
        label={`Buscar ${topic}`}
        variant='standard'
        autoComplete='off'
        InputProps={{
                endAdornment: (
                <span style={{
                color:'gray', 
                cursor:'pointer'
                }} onClick={handleInputClear}>
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
        sx={{
                lineHeight: '15px',
        }}
        >
                <AddIcon/>{`Nuevo ${topic}`}
        </Button>
       </Grid>


    </Grid>
    
      </>
  )
}
