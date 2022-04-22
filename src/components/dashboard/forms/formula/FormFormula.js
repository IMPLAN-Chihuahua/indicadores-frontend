import { Button, DialogActions, DialogContent, Grid } from "@mui/material";
import { Box } from "@mui/system";
import EquationEditor from "equation-editor-react";
import "../../../common/mathInput/mathInput.css";
import { useEffect } from "react";
import { Controller, FormProvider, useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addFormulaData } from "../../../../features/indicador/indicadorSlice";
import { isObjEmpty } from "../../../../utils/objects";
import { Variable } from "../../../common/formula/Variable";

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
                Equation
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