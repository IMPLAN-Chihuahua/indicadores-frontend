import { Box, Button, TextField, Container, Grid, FormGroup, FormControlLabel, Switch, CssBaseline, Typography, Alert, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import React from 'react';
import {FormProvider } from "react-hook-form";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const FormDelete = ({ topic = 'dato', element='elemento', handleDelete = () => {console.log('Default')}, type='off', handleCloseModal }) => {
const handleSubmit = (e) => {
    e.preventDefault();
    handleDelete()
}
    return (
        <>
            <FormProvider>
                {
                (type == 'off')

                ?
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
                    <RemoveCircleIcon style={{
                        color:'red',
                        fontSize: '60px',
                        marginRight: '5px'
                    }} />
                    <p style={{
                        whiteSpace: 'pre-wrap'
                    }}>{`Desea deshabilitar el ${topic}\n`}<b>{`${element}`}</b></p>
                    </div>
                </DialogContent>    
                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancelar</Button>
                    <Button type='submit' variant='contained'>Aceptar</Button>
                </DialogActions>
            </Box>
                
                :
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
                    <CheckCircleIcon style={{
                        color:'green',
                        fontSize: '60px',
                        marginRight: '5px'
                    }} />
                    <p style={{
                        whiteSpace: 'pre-wrap'
                    }}>{`Desea habilitar el ${topic}\n`}<b>{`${element}`}</b></p>
                    </div>
                </DialogContent>    
                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancelar</Button>
                    <Button type='submit' variant='contained'>Aceptar</Button>
                </DialogActions>
            </Box>
                }

             
            </FormProvider>
        </>
    )
}
export default FormDelete;