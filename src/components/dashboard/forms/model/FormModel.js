import { Box, Input, TextField, Select, Container, Grid, FormGroup, FormControlLabel, Switch } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import ColorPicker from '../../common/ColorPicker';

const FormModel = (id = 0) => {
    const defaultValues = {
        temaIndicador: 'Vengo del backend',
        codigo: '666',
        observaciones: 'Esto se debe de cambiar para poblar con la info del backend',
        activo: 'NO',
        imagen: 'http://www.coches.net/wp-content/uploads/2018/06/coche-nuevo-ford-focus-2018-1.jpg',
        color: '#0000', 
    };

    const {control, handleSubmit} = useForm({defaultValues});
    const onSubmit = data => alert(JSON.stringify(data));

    const [color, setColor] = React.useState('#ff0000');
    return (
        <Container sx={{mt: 3, bgcolor: 'rgba(45, 244, 247, 0.27)', maxWidth: {md: 'md'}}}>
            <Grid container spacing={3} sx={{mt: 3}}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid item xs={12} sx={{mb:3}}>
                        <Controller
                            name="temaIndicador"
                            control={control}
                            render={({ field }) => <TextField variant='outlined' label='Tema indicador' {...field} />}
                        />
                        <Controller
                            name="codigo"
                            control={control}
                            render={({ field }) => <TextField variant='outlined' label='Código' {...field} />}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{mb:3}}>
                        <Controller
                            name="activo"
                            control={control}
                            render={({ field }) => (
                                <FormGroup>
                                    <FormControlLabel 
                                        control={<Switch {...field} defaultChecked={true}
                                        />} 
                                        label="Activo"
                                    />
                                </FormGroup>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{mb:3}}>
                        <Controller
                            name="imagen"
                            control={control}
                            render={({ field }) => <TextField variant='outlined' label='Imagen de de la temática' {...field} />}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{mb:3}}>
                        
                        <Controller
                            name="color"
                            control={control}
                            render={({ field }) => <ColorPicker color={color} onChange={setColor} hidden/>}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="observaciones"
                            control={control}
                            render={({ field }) => <TextField variant='outlined' label='Observaciones' {...field} />}
                        />
                    </Grid>
                        <input type="submit" />
                </form>
           </Grid>
        </Container>
    )
}
export default FormModel;