import { Box, Button, DialogActions, DialogContent, DialogTitle, CircularProgress } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useIsMounted from "../../../../../../hooks/useIsMounted";
import { getCatalogosDetails } from "../../../../../../services/cataloguesService";
import { UNIDAD_MEDIDA_ID } from "../../../../../../utils/getCatalog";
import { Variable, VARIABLE_MODES } from "../../../../../common/formula/Variable";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { addVariable } from "../../../../../../services/formulaService";
import { showAlert } from "../../../../../../utils/alert";
import { updateVariable } from "../../../../../../services/variablesService";

const variableSchema = Yup.object().shape({
  nombre: Yup.string().required('Nombre es requerido'),
  dato: Yup.string().default(0).nullable().notRequired(),
  anio: Yup
    .number()
    .transform(value => isNaN(value) ? undefined : value)
    .max(new Date().getFullYear(), 'El año no puede ser mayor al actual')
    .default(0)
    .notRequired(),
  descripcion: Yup.string().optional(),
  medida: Yup.string().notRequired().trim()
})

export const VARIABLE_FORM_ACTIONS = {
  NEW: 'Nueva',
  EDIT: 'Editar'
}

export const defaultVariable = {
  nombre: '',
  dato: '',
  anio: '',
  variableDesc: '',
  medida: '',
}

const FormVariable = (props) => {
  const methods = useForm({
    defaultValues: defaultVariable,
    resolver: yupResolver(variableSchema)
  });


  const onSubmit = (data) => {
    showAlert({
      title: `¿Deseas agregar esta registro?`,
      text: `Al agregar este registro, los cambios generados se actualizarán en la tabla de variables de Chihuahua Métrica y en el sistema de gestión de Chihuahua en Datos.`,
      showCancelButton: true,
      icon: 'question',
    }).then(option => {
      if (option.isConfirmed) {
        const variableObj = {
          nombre: data.nombre,
          dato: data.dato,
          descripcion: data.variableDesc,
          anio: data.anio,
          idUnidad: data.medida.id
        }
        if (props.action === VARIABLE_FORM_ACTIONS.NEW) {
          return addVariable(props.idFormula, {
            variables: [variableObj]
          })
        } else if (props.action === VARIABLE_FORM_ACTIONS.EDIT) {
          return updateVariable(props.selectedVariable.id, variableObj)
        }
      }
    }).then(_ => {
      showAlert({
        title: 'Operación realizada correctamente',
        text: `El registro ha sido ${props.action === VARIABLE_FORM_ACTIONS.NEW ? 'agregado' : 'modificado'}.`,
        icon: 'success',
      })
      methods.reset();
      props.mutate();
      props.handleClose();
    }).catch(err => {
      showAlert({
        title: 'Error',
        text: err,
        icon: 'error',
      })
    })
  }

  useEffect(() => {
    if (props.selectedVariable) {
      methods.reset(props.selectedVariable);
    }
  }, []);

  return (
    <FormProvider {...methods}>
      <DialogTitle>{props.action} Variable</DialogTitle>
      <DialogContent>
        <Box
          component='form'
          id='form-variable'
          paddingTop={1}
          onSubmit={methods.handleSubmit(onSubmit)}
          noValidate
          onReset={() => {
            methods.reset()
            props.handleClose()
          }}
        >
          <Variable
            direction='column'
            mode={VARIABLE_MODES.SINGLE}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant='text'
          type='reset'
          form='form-variable'>Cancelar</Button>
        <Button
          variant='contained'
          type='submit'
          form='form-variable'>Guardar</Button>
      </DialogActions>
    </FormProvider>
  );
};

export default FormVariable;