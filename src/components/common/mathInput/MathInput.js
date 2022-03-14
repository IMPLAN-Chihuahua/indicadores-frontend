import React, { useState, useRef } from "react";
import EquationEditor from "equation-editor-react";
import './mathInput.css'

export const MathInput = () => {
    const [equation, setEquation] = useState("(x^2 + y^2)");
    return (
        <div className="mi-container">
            <div className="mi-equation">
      <EquationEditor
        value={equation}
        onChange={setEquation}
        autoCommands="pi theta sqrt sum prod alpha beta gamma rho"
        autoOperatorNames="sin cos tan"
        />
        </div>
        {/* <h3>{equation}</h3> */}
        </div>
    )
}
