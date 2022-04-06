import { Button, DialogActions, DialogContent } from "@mui/material";
import { Box } from "@mui/system";
import EquationEditor from "equation-editor-react";
import { Controller, FormProvider, useFieldArray, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addFormulaData } from "../../../../features/indicador/indicadorSlice";
import { Variable } from "../../../common/formula/Variable";

export const FormFormula = ({handleBack, handleNext}) => {
  const methods = useForm({
    defaultValues: {
      ecuacion: '',
      variables: [
        {
          nombre: '',
          dato: '',
          anio: '',
        }
      ]
    }
  });
  const { handleSubmit, control } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variables'
  })
  const addVariable = (variable) => append({ ...variable });
  const deleteVariable = (index) => remove(index);

  const dispatch = useDispatch();
  const onSubmit = data => {
    dispatch(addFormulaData(data))
    handleNext();
  };

  return (
    <>
      <DialogContent style={{ height: '60vh' }}>
        <FormProvider {...methods}>
          <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <Controller
              name='ecuacion'
              control={control}
              render={({
                field: { onChange, value }
              }) => (
                <EquationEditor
                  value={value}
                  onChange={onChange}
                  autoCommands="pi theta sqrt sum prod alpha beta gamma rho"
                  autoOperatorNames="sin cos tan"
                />
              )}
            />

            {fields.map((field, i) => (
              <Variable
                index={i}
                key={field.id}
                addVariable={i === 0 && addVariable}
                deleteVariable={i !== 0 && deleteVariable}
              />
            ))}
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