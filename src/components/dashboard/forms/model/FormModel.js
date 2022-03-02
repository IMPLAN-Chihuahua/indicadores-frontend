import { Box, Button, TextField, Container, Grid, FormGroup, FormControlLabel, Switch, CssBaseline, Typography, Alert } from '@mui/material';
import React from 'react';
import { useForm, Controller } from "react-hook-form";
import ColorPicker from '../../common/ColorPicker';
import { yupResolver } from '@hookform/resolvers/yup';
import { moduleSchema } from '../../../../utils/validator';


const FormModel = ({data = 0}) => {

    let defaultValues = {
        temaIndicador: '',
        codigo: '',
        observaciones: '',
        activo: 'SI' ? true : false,
        imagen: '',
        color: '', 
    };
    defaultValues = data ? data : defaultValues;
    
    const {control, handleSubmit, formState: {errors}} = useForm({defaultValues, resolver: yupResolver(moduleSchema)});
    const onSubmit = data => alert(JSON.stringify(data));

    const [color, setColor] = React.useState(defaultValues.color ? defaultValues.color : '#d32f2f');

    const [required, setRequired] = React.useState(false);
    const handleRequired = () => setRequired(!required);

    const [error, setError] = React.useState('');
    return (
        <Container sx={{mt: 3, pt: 4, pb: 4, border: '1px solid lightgray', maxWidth: {sm: 'sm'}}}>
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
                        rules={{required: 'Por favor, ingresa un tema de indicador'}}
                        render={({ field, fieldState: {error} }) => 
                            <TextField 
                                autoComplete='off'
                                size='small'
                                error={!!error}
                                helperText={error ? error.message : null}
                                variant='outlined' 
                                label='Tema indicador' 
                                autoFocus
                                {...field} 
                            />}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="codigo"
                        control={control}
                        rules={{required: 'Por favor, ingrese el código del indicador'}}
                        render={({ field, fieldState: {error} }) => <TextField 
                            size='small'
                            error={!!error}
                            helperText={error ? error.message : null}
                            variant='outlined' 
                            label='Código' 
                            {...field} 
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
                            rules={{required: 'Las observaciones debe contener máximo 255 caracteres'}}
                            render={({ field, fieldState: {error} }) => 
                            <TextField 
                                multiline
                                error={!!error}
                                helperText={error ? error.message : null}
                                rows={3}
                                sx={{width: '100%'}}
                                variant='outlined' 
                                label='Observaciones' 
                                {...field} 
                            />}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <Controller
                            name="activo"
                            control={control}
                            render={({ field }) => (
                                <FormGroup>
                                    <FormControlLabel 
                                        control={
                                            <Switch {...field} defaultChecked={defaultValues.activo === 'SI' ? true : false}/>
                                        } 
                                        label='Activo'
                                        labelPlacement='end'
                                    />
                                </FormGroup>
                            )}/>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button type='submit' variant='contained'>Guardar</Button>
                        {errors.required && (handleRequired)}
                    </Grid>
            </Grid>
        </Box>
        </Container>
    )
}
export default FormModel;