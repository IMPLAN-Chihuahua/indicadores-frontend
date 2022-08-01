import {
  Grid,
  Link as MuiLink, Typography,
  Box,
  TextField
} from "@mui/material";
import {
  Controller, FormProvider,
  useFieldArray, useForm
} from "react-hook-form";
import { MathJax } from "better-react-mathjax";
import EquationEditor from "equation-editor-react";
import { useCallback, useEffect, useState } from "react";
import "../../../common/mathInput/mathInput.css";
import { Variable } from "../../../common/formula/Variable";
import { getCatalogosDetails } from "../../../../services/cataloguesService";
import { useIndicadorContext } from "../../../../contexts/IndicadorContext";

const UNIDAD_MEDIDA_ID = 2;

const EquationInput = ({ value, onChange }) => {
  return (
    <div>
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
      <div style={{ fontSize: '1.5rem' }}>
        <MathJax>{`\\(${equation}\\)`}</MathJax>
      </div>
      <Typography
        variant='body2'
      >Doble clic para editar ecuación</Typography>
    </>
  )
}

export const FormFormula = () => {
  const { indicador, onSubmit } = useIndicadorContext();
  const methods = useForm({
    defaultValues: {
      ecuacion: '',
      descripcion: '',
      variables: [
        {
          nombre: '',
          dato: '',
          anio: '',
          medida: null,
          descripcion: ''
        }
      ]
    }
  });
  const { handleSubmit, control, reset } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variables'
  });

  const addVariable = (variable) => append({ ...variable });
  const deleteVariable = (index) => remove(index);
  const [medidaOptions, setMedidaOptions] = useState([]);

  const fetchUnidadMedida = useCallback(async () => {
    const items = await getCatalogosDetails(UNIDAD_MEDIDA_ID);
    setMedidaOptions(items);
  }, [setMedidaOptions]);

  useEffect(() => {
    if (medidaOptions.length > 0) {
      return;
    }
    fetchUnidadMedida();
  }, [fetchUnidadMedida]);

  useEffect(() => {
    if (indicador.formula.ecuacion === '') {
      return;
    }
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
      >
        <Grid container gap={2}>
          <Grid item xs={12}>
            <Typography variant='h5' component='h3'>Formula</Typography>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name='descripcion'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  fullWidth
                  multiline
                  label='Descripción'
                  rows={2}
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
              }) => editingEquation ?
                  (
                    <EquationInput
                      value={value}
                      onChange={onChange}
                    />
                  ) :
                  (
                    <Box onDoubleClick={() => setEditingEquation(true)}>
                      {
                        value ?
                          (
                            <EquationViewer equation={value} />
                          ) :
                          (<Typography
                            variant='body2'
                            sx={{
                              backgroundColor: 'aliceBlue',
                              border: '2px dashed rgba(0,0,0,0.6)',
                              padding: 2,
                              borderRadius: '5px'
                            }}
                          >
                            Haz doble clic para ingresar la ecuación
                          </Typography>)
                      }
                    </Box>
                  )
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h5' component='h3'>Variables</Typography>
          </Grid>
          {fields.map((field, i) => (
            <Variable
              index={i}
              key={field.id}
              addVariable={i === 0 && addVariable}
              deleteVariable={i !== 0 && deleteVariable}
              medidaOptions={medidaOptions}
            />
          ))}
        </Grid>
      </Box>
    </FormProvider>
  );
};