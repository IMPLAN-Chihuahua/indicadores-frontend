import { Button } from "@mui/material";
import { Box } from "@mui/system";
import EquationEditor from "equation-editor-react";
import { Controller, FormProvider, useFieldArray, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addFormulaData } from "../../../../features/indicador/indicadorSlice";
import { Variable } from "../../../common/formula/Variable";

export const FormFormula = () => {
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
  const onSubmit = data => dispatch(addFormulaData(data));

  return (
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
        <Button type='submit'>Aceptar</Button>
      </Box>
    </FormProvider>
  );
};