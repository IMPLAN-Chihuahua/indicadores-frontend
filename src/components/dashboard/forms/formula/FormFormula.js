import {
  Grid, Link as MuiLink, Typography, Box,
  TextField, CircularProgress, Button, FormControlLabel, Checkbox
} from "@mui/material";
import { Controller, FormProvider, useFieldArray, useForm, useWatch } from "react-hook-form";
import { MathJax } from "better-react-mathjax";
import EquationEditor from "equation-editor-react";
import { useCallback, useEffect, useState } from "react";
import "../../../common/mathInput/mathInput.css";
import { Variable } from "../../../common/formula/Variable";
import { getCatalogosDetails } from "../../../../services/cataloguesService";
import { useIndicadorContext } from "../../../../contexts/IndicadorContext";
import useIsMounted from "../../../../hooks/useIsMounted";
import { UNIDAD_MEDIDA_ID } from "../../../../utils/getCatalog";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { defaultVariable } from "../../components/home/Indicators/Formula/FormVariable";

const formulaSchema = Yup.object().shape({
  ecuacion: Yup.string().trim(),
  descripcion: Yup.string(),
  variables: Yup.array().when('ecuacion', {
    is: (ecuacion) => !!ecuacion,
    then: Yup.array().of(Yup.object().shape({
      nombre: Yup.string().trim().min(1, 'Ingresa un nombre valido').required('Ingresa una variable'),
      dato: Yup
        .string()
        .default('No aplica')
        .notRequired(),
      anio: Yup
        .number()
        .transform(value => isNaN(value) ? undefined : value)
        .max(new Date().getFullYear(), 'El año no puede ser mayor al actual')
        .default(0)
        .notRequired(),
      descripcion: Yup.string().optional(),
      medida: Yup.object().typeError('Selecciona una unidad de medida').required()
    })
    )
  })
});

const EquationInput = ({ value, onChange }) => {
  return (
    <div style={{ width: '100%' }}>
      <EquationEditor
        value={value}
        onChange={onChange}
        autoCommands="pi theta sqrt sum prod alpha beta gamma rho"
        autoOperatorNames="sin cos tan"
      />
      <MuiLink
        target='_blank'
        rel='noopener noreferrer'
        variant='body2'
        href='https://www.latex-project.org/help/documentation/amsldoc.pdf'
      >Documentación LaTex</MuiLink>
    </div>
  );
};

const EquationViewer = ({ equation }) => {
  return (
    <>
      <div style={{ fontSize: '1.5rem', width: '100%' }}>
        <MathJax>{`\\(${equation}\\)`}</MathJax>
      </div>
      <Typography
        variant='body2'
      >Doble clic para editar ecuación</Typography>
    </>
  )
}

export const FormFormula = (props) => {
  const { indicador, onSubmit } = useIndicadorContext();
  const isMounted = useIsMounted();
  const methods = useForm({
    resolver: yupResolver(formulaSchema),
    defaultValues: {
      ecuacion: '',
      descripcion: '',
      hasEcuacion: true,
      variables: [defaultVariable]
    }
  });
  const { handleSubmit, control, reset, setValue } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variables'
  });
  const hasEcuacion = useWatch({ control, name: 'hasEcuacion', defaultValue: true })

  const addVariable = variable => append({ ...variable });
  const deleteVariable = idx => remove(idx);
  const [medidaOptions, setMedidaOptions] = useState([]);

  const fetchUnidadMedida = useCallback(async () => {
    if (medidaOptions.length > 0) {
      return;
    }
    const items = await getCatalogosDetails(UNIDAD_MEDIDA_ID);
    if (isMounted()) {
      setMedidaOptions(items);
    }
  }, [medidaOptions, isMounted]);

  useEffect(() => {
    fetchUnidadMedida();
    reset(indicador.formula);
  }, []);

  const [editingEquation, setEditingEquation] = useState(false);

  return (
    <FormProvider {...methods}>
      <Box
        id='form-formula'
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        mt={1}
      >
        <Grid container gap={2}>
          {
            props.defaultTitle && (
              <Grid item xs={12}>
                <Typography variant='h5' component='h3'>Formula</Typography>
              </Grid>
            )
          }
          <Grid item xs={12}>
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
                    rows={2}
                  />
                )
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name='hasEcuacion'
              control={control}
              render={() => (
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
              )}
            />
          </Grid>
          <Grid item xs={12}>
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
                  : (
                    <TextField
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
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h5' component='h3'>Variables</Typography>
          </Grid>
          {
            medidaOptions.length > 0 ? fields.map((field, i) => (
              <Variable
                index={i}
                key={field.id}
                addVariable={i === 0 && addVariable}
                deleteVariable={i !== 0 && deleteVariable}
                medidaOptions={medidaOptions}
              />
            )) : (
              <CircularProgress color='primary' />
            )
          }
        </Grid>
      </Box>
    </FormProvider>
  );
};

export { EquationInput, EquationViewer };