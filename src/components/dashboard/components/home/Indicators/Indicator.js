import React, {useState} from 'react'
import './indicator.css'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid, Input, TextField, Typography } from '@mui/material';

export const Indicator = () => {
    const [indicator, setIndicator] = useState('');

    const handleChange = (e) => {
        setIndicator(e.target.value);
    }

  return (
    <>
        <div className='nav-indicator'>
                <div className='nav-indicator-left nav-arrows'>
                    <ArrowBackIosNewIcon className='nav-indicator-icon' />
                </div>
                <div className='nav-indicator-center'>
                    <FormControl sx={{width: '100%'}}>
                        <Select
                            value={indicator}
                            onChange={handleChange}
                            autoWidth
                            label='indicator'
                        >
                            <MenuItem value={1}>Accesibilidad ciclista o algo</MenuItem>
                            <MenuItem value={2}>Accesibilidad</MenuItem>
                            <MenuItem value={3}>Holaaaaa yo soy un indicador nomas</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className='nav-indicator-right nav-arrows'>
                    <ArrowForwardIosIcon className='nav-indicator-icon' />
                </div>
        </div>
        <div className='body-indicator'>
            <Grid container spacing={1}>
                <Grid item xs={4} md={4}>
                    <Typography variant="subtitle1" component="h4">
                        Información	de indicador
                    </Typography>
                    <div className='body-upper-left'>
                        <img src='https://dam.ngenespanol.com/wp-content/uploads/2021/02/capibara.jpg' className='image-indicator'/>
                        <TextField id="outlined-basic" label="Nombre del indicador" variant="outlined" />
                        <TextField id="outlined-basic" label="Definicion" variant="outlined" />
                    </div>
                </Grid>
                <Grid item xs={2} md={2}>

                </Grid>
                <Grid item xs={5} md={5}>
                    <div className='body-upper-right'>
                        <Typography variant="subtitle1" component="h4">
                            Identificadores
                        </Typography>
                        <TextField id="outlined-basic" label="Código" variant="outlined" />
                        <TextField id="outlined-basic" label="Código objeto" variant="outlined" />
                    </div>
                    <div className='body-mid-right'>
                        <Typography variant="subtitle1" component="h4">
                            Valores
                        </Typography>
                        <TextField id="outlined-basic" label="Último valor disponible" variant="outlined" />
                        <TextField id="outlined-basic" label="Año del último valor" variant="outlined" />
                        <TextField id="outlined-basic" label="Tendencia actual" variant="outlined" />
                        <TextField id="outlined-basic" label="Tendencia deseada" variant="outlined" />
                        <TextField id="outlined-basic" label="Mapa" variant="outlined" />
                    </div>
                    <div className='body-down-right'>
                        <Typography variant="subtitle1" component="h4">
                            Fórmula
                        </Typography>
                        <TextField id="outlined-basic" label="Ecuación" variant="outlined" />
                        <TextField id="outlined-basic" label="Descripción de ecuación" variant="outlined" />
                        <TextField id="outlined-basic" label="Unidad de medida" variant="outlined" />
                        <TextField id="outlined-basic" label="Tendencia deseada" variant="outlined" />
                        <TextField id="outlined-basic" label="Mapa" variant="outlined" />
                    </div>
                </Grid>

            </Grid>
        </div>
    </>
  )
}
