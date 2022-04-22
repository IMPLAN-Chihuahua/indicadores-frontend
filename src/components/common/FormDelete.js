import { Box, Button, TextField, Container, Grid, FormGroup, FormControlLabel, Switch, CssBaseline, Typography, Alert, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import React from 'react';
import { useForm, Controller, FormProvider } from "react-hook-form";
import CancelIcon from '@mui/icons-material/Cancel';

const FormDelete = ({ topic = 'dato', element='elemento', handleDelete = () => {console.log('Default')} , handleCloseModal }) => {

const handleSubmit = (e) => {
    e.preventDefault();
    handleDelete()
}

    return (
        <>
            <FormProvider>
                <Box
                    component='form'
                    onSubmit={handleSubmit}
                >
                    <DialogContent style={{
                        borderBottom: '1px solid #ccc'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            alignContent: 'center',
                            }}>
                        <CancelIcon style={{
                            color:'red',
                            fontSize: '60px',
                            marginRight: '5px'
                        }} />
                        <p style={{
                            whiteSpace: 'pre-wrap'
                        }}>{`Desea eliminar el ${topic}\n`}<b>{`${element}`}</b></p>
                        </div>
                    </DialogContent>    
                    <DialogActions>
                        <Button onClick={handleCloseModal}>Cancelar</Button>
                        <Button type='submit' variant='contained'>Aceptar</Button>
                    </DialogActions>
                </Box>
            </FormProvider>
        </>
    )
}
export default FormDelete;