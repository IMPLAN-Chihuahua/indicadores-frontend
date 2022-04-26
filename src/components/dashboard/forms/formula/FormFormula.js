import {
  Button, DialogActions,
  DialogContent, Grid,
  Link as MuiLink, Typography,
  Box
} from "@mui/material";
import {
  Controller, FormProvider,
  useFieldArray, useForm
} from "react-hook-form";
import { MathJax } from "better-react-mathjax";
import EquationEditor from "equation-editor-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../common/mathInput/mathInput.css";
import { addFormulaData } from "../../../../features/indicador/indicadorSlice";
import { isObjEmpty } from "../../../../utils/objects";
import { Variable } from "../../../common/formula/Variable";


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
      >Documentación MathJax</MuiLink>
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
      >Doble click para editar ecuación</Typography>
    </>
  )
}

export const FormFormula = ({ handleBack, handleNext }) => {
  const methods = useForm({
    defaultValues: {
      ecuacion: '',
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
  })

  const dispatch = useDispatch();
  const addVariable = (variable) => append({ ...variable });
  const deleteVariable = (index) => remove(index);
  const onSubmit = data => {
    dispatch(addFormulaData(data))
    handleNext();
  };

  const formulaForm = useSelector((state) => state.indicadores.formula);

  useEffect(() => {
    if (!isObjEmpty(formulaForm)) {
      reset(formulaForm);
    }
  }, []);

  const [editingEquation, setEditingEquation] = useState(false);

  return (
    <>
      <DialogContent style={{ height: '60vh' }}>
        <FormProvider {...methods}>
          <Box
            component='form'
            noValidate
          >
            <Grid container gap={2}>
              <Grid item xs={12}>
                <Typography component='label'>Ecuación
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
                                  variant='body1'>
                                  Doble click para ingresar la ecuación
                                </Typography>)
                            }
                          </Box>
                        )
                    }
                  />
                </Typography>
              </Grid>
              {fields.map((field, i) => (
                <Variable
                  index={i}
                  key={field.id}
                  addVariable={i === 0 && addVariable}
                  deleteVariable={i !== 0 && deleteVariable}
                />
              ))}
            </Grid>
          </Box>
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleBack}>Atras</Button>
        <Button variant='contained' onClick={handleSubmit(onSubmit)}>Siguiente</Button>
      </DialogActions>
    </>
  );
};