import EquationEditor from "equation-editor-react";
import { Typography } from '@mui/material';
import './mathInput.css'

export const MathInput = (props) => {
  return (
    <div className="mi-equation">
      <Typography component='label'>Formula</Typography>
      {
        (props.value || props.value === '') && (
          <EquationEditor
            value={props.value}
            onChange={props.onChange}
            autoCommands="pi theta sqrt sum prod alpha beta gamma rho"
            autoOperatorNames="sin cos tan"
          />
        ) 
      }
      ecuacion: {props.value}
    </div>
  )
}
