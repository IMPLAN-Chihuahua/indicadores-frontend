import { Typography } from "@mui/material";
import { useState } from "react";
import { Variable } from "../../../common/formula/Variable";
import { MathInput } from "../../../common/mathInput/MathInput";

export const FormFormula = () => {
  const [variables, setVariables] = useState([{}]);

  const addVariable = () => {
    setVariables(...variables, {})
  }

  const deleteVariable = () => {
    setVariables(variables.slice(0, variables.length - 1))
  }

  return (
    <>
      <Typography variant='subtitle1' component='h4'>
        Formula
      </Typography>
      <MathInput />
      {variables.map((v, i) => (
        <Variable
          key={i}
          content={v}
          addVariable={i === (variables.length - 1) && addVariable}
          deleteVariable={i === (variables.length - 1) && deleteVariable}
        />
      ))}
    </>
  );
};