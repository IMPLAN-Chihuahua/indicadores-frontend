import { Box, Button, TextField, Container, Grid, FormGroup, FormControlLabel, Switch, CssBaseline, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import ColorPicker from '../../common/ColorPicker';
import { HexColorInput } from 'react-colorful';

const FormModel = (id = 0) => {
    const defaultValues = {
        temaIndicador: '',
        codigo: '',
        observaciones: '',
        activo: '',
        imagen: '',
        color: '', 
    };

    const {control, handleSubmit} = useForm({defaultValues});
    const onSubmit = data => alert(JSON.stringify(data));

    const [color, setColor] = React.useState(defaultValues.color ? defaultValues.color : '#d32f2f');

    return (
        <Container sx={{mt: 3, pt: 4, pb: 4, border: '1px solid lightgray', maxWidth: {sm: 'sm'}}}>
        <CssBaseline />
        <Box component='form' onSubmit={handleSubmit(onSubmit)}>
            <Grid container columnSpacing={3} rowSpacing={2}>
                <Grid item xs={12}>
                    <Box
                        backgroundColor='lightgray'
                        height={250}
                        display='flex'
                    >
                        <Typography variant="h6" component="h3" sx={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            paddingTop: '1rem',
                            paddingBottom: '1rem',
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            Drag and Drop or click to select a file
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="temaIndicador"
                        control={control}
                        render={({ field }) => <TextField variant='outlined' label='Tema indicador' {...field} />}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="codigo"
                        control={control}
                        render={({ field }) => <TextField variant='outlined' label='Código' {...field} 
                        sx={{maxWidth: '77px'}}
                        />}
                    />
                </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="color"
                            control={control}
                            render={({ field }) => (
                            <ColorPicker color={color} onChange={setColor}/>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="observaciones"
                            control={control}
                            render={({ field }) => <TextField 
                            multiline
                            rows={3}
                            sx={{width: '100%'}}
                            variant='outlined' label='Observaciones' {...field} />}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <Controller
                            name="activo"
                            control={control}
                            render={({ field }) => (
                                <FormGroup>
                                    <FormControlLabel 
                                        control={<Switch defaultChecked={true}/>} 
                                        label='Activo'
                                        labelPlacement='end'
                                    />
                                </FormGroup>
                            )}/>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button type='submit' variant='contained'>Guardar</Button>
                    </Grid>
            </Grid>
        </Box>
        </Container>
    )
}
export default FormModel;