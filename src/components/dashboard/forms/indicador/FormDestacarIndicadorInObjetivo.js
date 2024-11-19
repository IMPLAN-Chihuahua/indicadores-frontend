import {
    Box, Button, Checkbox, Dialog, DialogActions,
    DialogContent, DialogTitle, FormControlLabel,
    FormGroup, FormLabel, Typography
} from "@mui/material"
import { Controller, useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { destacarIndicadorInObjetivos, getObjetivosStatus } from "../../../../services/indicatorService";
import { red } from "@mui/material/colors";
import Swal from "sweetalert2";


const FormDestacarIndicadorInObjetivo = ({ open = false, handleClose }) => {
    const { id: idIndicador } = useParams();
    const { handleSubmit, control } = useForm({ defaultValues: { objetivos: [] } });
    const [objetivosWithDestacadoStatus, setObjetivosWithDestacadoStatus] = useState([]);
    const [errorResponse, setErrorResponse] = useState(null);
    const navigate = useNavigate();

    const destacarIndicador = async (data) => {
        try {
            const response = await destacarIndicadorInObjetivos(idIndicador, data)
            Swal.fire('Operación concluida', response.data.message, 'success');
            handleClose();
        } catch (err) {
            setErrorResponse(err);
        }
    }

    const goToIndicador = useCallback((idIndicador) => {
        navigate(`/indicadores/${idIndicador}`);
        handleClose();
    }, [])

    const initializeValues = useCallback(async () => {
        const { data: objetivos = [] } = await getObjetivosStatus(idIndicador) || {};
        setObjetivosWithDestacadoStatus(objetivos)
    }, [idIndicador])

    useEffect(() => {
        initializeValues();
    }, [initializeValues])

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
            <DialogTitle>Destacar indicador en objetivos</DialogTitle>
            <DialogContent sx={{ height: '285px', maxHeight: '285px', overflow: 'scroll' }}>
                {
                    errorResponse !== null ? (
                        <Box>
                            <Typography color={red[900]}>{errorResponse.message}</Typography>
                            {
                                errorResponse?.data?.length > 0 &&
                                    errorResponse.data.map(objetivo => (
                                        <Box key={objetivo.id}>
                                            <Typography>{objetivo.titulo} Cuenta con los siguientes indicadores destacados:</Typography>
                                            <ul style={{ listStyle: 'none', paddingLeft: '1.5em', marginTop: '.4em', marginBottom: '.4em' }}> {
                                                objetivo.indicadores.map(indicador => (
                                                    <li key={indicador.id}>
                                                        <Button
                                                            size='medium'
                                                            sx={{ textTransform: 'none' }}
                                                            variant='text' onClick={() => goToIndicador(indicador.id)}
                                                        >{indicador.nombre}</Button>
                                                    </li>
                                                ))
                                            } </ul>
                                        </Box>
                                    )) 
                            }
                        </Box>
                    ) : (
                        <Box
                            component='form'
                            id='form-indicador-objetivos-highlight'
                            onSubmit={handleSubmit(destacarIndicador)}
                        >
                            <FormLabel>Selecciona los objetivos en donde quieres destacar este indicador</FormLabel>
                            <FormGroup>
                                {objetivosWithDestacadoStatus.map((objetivo, idx) => (
                                    <Controller
                                        control={control}
                                        name={`objetivos.${idx}`}
                                        defaultValue={{
                                            id: objetivo.idObjetivo,
                                            destacado: objetivo.destacado
                                        }}
                                        key={objetivo.idObjetivo}
                                        render={({ field: { value, onChange } }) => (
                                            <FormControlLabel
                                                control={<Checkbox />}
                                                label={objetivo.titulo}
                                                value={value?.idObjetivo}
                                                onChange={(e) => {
                                                    onChange({ id: objetivo.idObjetivo, destacado: e.target.checked })
                                                }}
                                                checked={value?.destacado}
                                            />
                                        )}
                                    />
                                ))}
                            </FormGroup>
                        </Box>
                    )
                }
            </DialogContent>
            <DialogActions>
                <Button disabled={errorResponse === null} onClick={() => setErrorResponse(null)}>Volver</Button>
                <div style={{ marginLeft: 'auto' }}>
                    <Button variant='text' onClick={handleClose} >Cancelar</Button>
                    <Button
                        variant='contained'
                        type='submit'
                        form='form-indicador-objetivos-highlight'
                    >Aceptar</Button>
                </div>
            </DialogActions>
        </Dialog>
    )
}

export default FormDestacarIndicadorInObjetivo;