import {
  Box, Button, Checkbox, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, IconButton, Paper, Table, TableBody,
  TableCell, TableHead, TableRow, TextField, Typography,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useParams } from "react-router-dom";
import { addFormula, useIndicadorFormula } from "../../../../../../services/indicatorService";
import { EquationInput, EquationViewer, FormFormula } from "../../../../forms/formula/FormFormula";
import { MathJax } from "better-react-mathjax";
import { deleteVariable } from "../../../../../../services/variablesService";
import FormDialog from "../../../../common/FormDialog";
import useIsMounted from "../../../../../../hooks/useIsMounted";
import '../indicator.css';
import FormVariable, { defaultVariable, VARIABLE_FORM_ACTIONS } from "./FormVariable";
import { updateFormula } from "../../../../../../services/formulaService";
import ErrorContent from "../../../../forms/indicador/ErrorContent";
import { IndicadorProvider } from "../../../../../../contexts/IndicadorContext";
import { showAlert } from "../../../../../../utils/alert";
import PersonalLoader from "../../../../../common/PersonalLoader/PersonalLoader";

const VariableTable = (props) => {

  return (
    <Table aria-label='Variables usadas en la ecuación'>
      <TableHead>
        <TableRow>
          <TableCell>Variable</TableCell>
          <TableCell>Dato</TableCell>
          <TableCell>Año</TableCell>
          <TableCell>Descripción</TableCell>
          <TableCell>Unidad de medida</TableCell>
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          props.variables.length === 0 ?
            (<TableRow>
              <TableCell align='center' colSpan={6}>No hay variables en esta formula 😢</TableCell>
            </TableRow>)
            : props.variables.map(v => (
              <TableRow key={v.id}>
                <TableCell>
                  {
                    props.isFormula
                      ? (<MathJax inline>{`\\(${v.nombre}\\)`}</MathJax>)
                      : v.nombre
                  }
                </TableCell>
                <TableCell>{v.dato}</TableCell>
                <TableCell>{v.anio}</TableCell>
                <TableCell>{v.descripcion}</TableCell>
                <TableCell>{v.unidadMedida}</TableCell>
                <TableCell>
                  <div style={{ display: 'flex' }}>
                    <IconButton
                      aria-label='edit variable'
                      onClick={() => props.handleUpdate({
                        ...v,
                        // medida: v.catalogoDetail,
                        variableDesc: v.descripcion
                      })}>
                      <ModeEditIcon />
                    </IconButton>
                    <IconButton aria-label='delete variable' onClick={() => props.handleDelete(v.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))
        }
      </TableBody>
    </Table>
  );
}

const FormulaView = () => {
  const { id } = useParams();
  const { data: formula, error, mutate, isLoading } = useIndicadorFormula(id);
  const [selectedVariable, setSelectedVariable] = useState({});
  const [editingEquation, setEditingEquation] = useState(false);
  const [openFormVariable, setOpenFormVariable] = useState(false);
  const [openFormFormula, setOpenFormFormula] = useState(false);
  const [variableAction, setVariableAction] = useState('')
  const isMounted = useIsMounted();
  const methods = useForm({
    defaultValues: {
      ecuacion: '',
      descripcion: '',
      hasEcuacion: true
    }
  });

  const { control, reset, handleSubmit, setValue } = methods;
  const hasEcuacion = useWatch({ control, name: 'hasEcuacion' });

  const handleFormulaUpdate = (data) => {
    showAlert({
      title: `¿Deseas actualizar la formula de este indicador?`,
      text: `Al actualizar este registro, los cambios generados se actualizarán en Chihuahua Métrica y en el sistema de gestión de Chihuahua en Datos.`,
      icon: 'question',
      showCancelButton: true
    })
      .then(option => {
        if (option.isConfirmed) {
          return updateFormula(formula.id, {
            ecuacion: data.ecuacion,
            descripcion: data.descripcion,
            isFormula: data.hasEcuacion ? 'SI' : 'NO'
          })
        }
      })
      .catch(err => {
        showAlert({
          title: 'Ha ocurrido un error, contacta al administrador',
          customConfirmButtonText: 'Ok',
          text: err,
          icon: 'error'
        })
      })
      .then(status => {
        if (status) {
          showAlert({
            title: `Registro modificado correctamente`,
            text: `El registro ha sido modificado.`,
            icon: 'success',
          });
          mutate();
        }
      })
  }

  const handleFormulaSubmit = (data) => {
    if (data.ecuacion === '' || data.descripcion === '') {
      return;
    }
    data.variables = data.variables.map(v => ({
      ...v,
      descripcion: v.variableDesc,
      unidadMedida: v.unidadMedida
    }))
    data.isFormula = data.hasEcuacion ? 'SI' : 'NO';
    showAlert({
      title: `¿Deseas agregar esta formula al indicador?`,
      text: `Al agregar este registro, los cambios generados se actualizarán en Chihuahua Métrica y en el sistema de gestión de Chihuahua en Datos.`,
      icon: 'question',
      showCancelButton: true,
    })
      .then(res => {
        if (res.isConfirmed) {
          return addFormula(id, data)
        } else if (res.isDenied) {
          setOpenFormFormula(false);
        }
      })
      .then(status => {
        if (status) {
          showAlert({
            title: `Registro agregado correctamente`,
            text: `El registro ha sido agregado.`,
            icon: 'success',
          })
          mutate();
        }
      })
      .catch(err => {
        console.log(err)
        showAlert({
          title: 'Error',
          text: err,
          icon: 'error'
        })
      })
  }

  const handleVariableDelete = (id) => {
    showAlert({
      title: '¿Deseas eliminar esta variable?',
      text: 'Al eliminar este registro, dejará de ser visible en la tabla de variables de Chihuahua Métrica y en el sistema de gestión de Chihuahua en Datos.',
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        return deleteVariable(id)
      }
    })
      .then(res => {
        if (res) {
          showAlert({
            title: 'Eliminado!',
            text: 'El registro ha sido eliminado.',
            icon: 'success'
          });
          mutate()
        }
      })
      .catch(err => {
        showAlert({
          title: 'Error',
          icon: 'error',
          text: err
        })
      })
  }

  const handleVariableUpdate = (variable) => {
    setSelectedVariable(variable)
    setVariableAction(VARIABLE_FORM_ACTIONS.EDIT)
    setOpenFormVariable(true)
  }

  const handleAddVariable = () => {
    setVariableAction(VARIABLE_FORM_ACTIONS.NEW)
    setOpenFormVariable(true);
  }

  useEffect(() => {
    if (isMounted() && formula) {
      const { ecuacion, descripcion, isFormula } = formula;
      reset({ ecuacion, descripcion, hasEcuacion: isFormula === 'SI' })
    }
  }, [reset, formula])

  if (error) {
    return (
      <Box className='indicator' sx={{ overflow: 'auto', flex: '1 1 auto', height: '500px' }} padding={3}>
        <Paper sx={{ p: 2 }}>
          <ErrorContent error={error} justifyContent='flex-start' />
        </Paper>
      </Box>
    );
  }

  return (
    <Grid item xs={12} md={12} sx={{
      p: 1,
      height: '100%',
    }}>
      <Typography variant='h5'>Fórmula o método de adquisición de información</Typography>
      <Box className='indicator' sx={{ overflow: 'auto', flex: '1 1 auto', height: '500px' }} >
        {isLoading
          ? (<PersonalLoader />)
          : (Object.keys(formula).length === 0)
            ? (
              <Box
                sx={{ p: 2 }}
              >
                <Typography mb={1} variant='body1'>Este indicador no cuenta con una formula</Typography>
                <Button variant='contained' onClick={() => setOpenFormFormula(true)}>Agregar Fórmula</Button>
              </Box>)
            : (
              <Grid container gap={1}>
                <Paper
                  component={Grid}
                  container
                  item
                  xs={12}
                  md={12}
                  lg={4}
                  padding={3}
                  borderRadius='4px'
                  rowGap={2}
                  width='100%'
                  height='fit-content'
                  justifyContent='stretch'
                >
                  <Box
                    component='form'
                    width='100%'
                    display='flex'
                    flexDirection='column'
                    gap='10px'
                    id='form-formula'
                    onSubmit={handleSubmit(handleFormulaUpdate)}
                  >
                    <Controller
                      name='descripcion'
                      control={control}
                      render={({ field: { value, onChange } }) => {
                        return (
                          <TextField
                            value={value}
                            onChange={onChange}
                            fullWidth
                            multiline
                            label='Descripción'
                            rows={3}
                          />
                        )
                      }}
                    />
                    <Controller
                      name='ecuacion'
                      control={control}
                      render={({
                        field: { onChange, value }
                      }) => hasEcuacion
                          ? editingEquation
                            ? (<EquationInput value={value} onChange={onChange} />)
                            : (<Box onDoubleClick={() => setEditingEquation(true)}>
                              {
                                value ? <EquationViewer equation={value} /> : (
                                  <Typography
                                    variant='body2'
                                    sx={{
                                      backgroundColor: 'var(--blue-50)',
                                      border: '1px solid rgba(0,0,0,0.6)',
                                      padding: 2,
                                      borderRadius: '4px'
                                    }}
                                  >
                                    Da doble clic para ingresar la ecuación
                                  </Typography>)
                              }
                            </Box>)
                          : (<TextField
                            value={value}
                            onChange={onChange}
                            fullWidth
                            multiline
                            label='Otros medios'
                            placeholder='Describe el lugar de donde proviene la información'
                            rows={2}
                          />)
                      }
                    />
                    <Controller
                      name='hasEcuacion'
                      control={control}
                      render={({ field }) => (
                        <FormControlLabel
                          sx={{ alignSelf: 'flex-start' }}
                          control={
                            <Checkbox
                              checked={!field.value}
                              onChange={(e) => {
                                setValue('ecuacion', '')
                                field.onChange(!e.target.checked)
                              }}
                            />
                          }
                          label='No tiene ecuación'
                        />
                      )}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                      <Button
                        variant='contained'
                        type='submit'
                        form='form-formula'>
                        Actualizar
                      </Button>
                    </div>
                  </Box>
                </Paper>
                <Paper
                  component={Grid}
                  item
                  xs={12}
                  md
                  backgroundColor='white'
                  padding={3}
                  borderRadius='4px'
                  position='relative'
                >
                  <Button
                    variant='contained'
                    display='block'
                    onClick={handleAddVariable}>
                    Agregar Variable
                  </Button>
                  <Box overflow='scroll'>
                    <VariableTable
                      variables={formula.variables || []}
                      handleDelete={handleVariableDelete}
                      handleUpdate={handleVariableUpdate}
                      isFormula={formula && formula?.isFormula === 'SI'}
                    />
                  </Box>
                </Paper>
              </Grid >
            )
        }
      </Box >



      <FormDialog
        open={openFormVariable}
        fullWidth
        handleClose={() => {
          setOpenFormVariable(false)
          setSelectedVariable({})
        }}
      >
        <FormVariable
          action={variableAction}
          selectedVariable={selectedVariable}
          idFormula={formula && formula.id}
          mutate={mutate}
          handleClose={() => {
            setSelectedVariable({})
            setOpenFormVariable(false)
          }}
        />
      </FormDialog>
      {
        (formula && Object.keys(formula).length === 0)
        && (<>
          <FormDialog
            open={openFormFormula}
            handleClose={() => setOpenFormFormula(false)}
            fullWidth
            maxWidth='xl'
          >
            <IndicadorProvider
              indicador={{ formula: { descripcion: '', ecuacion: '', hasEcuacion: true, variables: [defaultVariable] } }}
              onSubmit={handleFormulaSubmit}
            >
              <DialogTitle>Formula</DialogTitle>
              <DialogContent sx={{ height: '60vh' }}>
                <FormFormula handleClose={() => setOpenFormFormula(false)} defaultTitle={false} />
              </DialogContent>
              <DialogActions>
                <Button variant='text' onClick={() => setOpenFormFormula(false)}>Cancelar</Button>
                <Button type='submit' form='form-formula' variant='contained'>Guardar</Button>
              </DialogActions>
            </IndicadorProvider>
          </FormDialog>
        </>)
      }
    </Grid>
  );
}

export default FormulaView;