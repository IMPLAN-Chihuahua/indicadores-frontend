import { Button } from "@mui/material";
import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { HashLoader } from "react-spinners";
import { publicApi } from "../../services";
import { confirmPasswordSchema } from "../../utils/validator";
import PassField from "../common/passField/PassField";
import "./FpCases.css";
import { SuccessCase } from "./SuccessCase";

export const UpdatedCase = ({token}) => {
  const {correo} = (jwtDecode(token).user)

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const formData = {
      password: e.target[0].value,
      confirmPassword: e.target[1].value,
    };

    const passIsValid = await confirmPasswordSchema
      .isValid(formData)
      .then((res) => {
        if (res) {

          if(formData.password == formData.confirmPassword){
            publicApi.patch(`/auth/password-reset/${token}`,JSON.stringify({clave: formData.password}))
            .then( res => {
              setMessage("");
              setError("");
              setLoading(false)
              setSuccess(true)
            })
            .catch( err => {
              console.log(err)
              setMessage("");
              setError("Ocurrio un error");
              setLoading(false)
            })
          }else{
            setMessage("");
            setError("Las contraseñas no coinciden");
            setLoading(false)
          }
        } else {
          setError("Por favor, llena todos los campos con al menos 8 caracteres");
          setMessage("");
          setLoading(false)
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
      });
  };

  return (
    <>
    {
      (!success)
      ?
      <div className="fpc-container-all">
      {(loading) && <div className='loading'><HashLoader/></div>}
        <form onSubmit={handleSubmit} className="fpc-container">
          <div className="fpc-header">
          <h1 style={{ textAlign: "center"}}>Recuperación de cuenta</h1>
          <h3 style={{ textAlign: "center", color: "rgb(0,0,255,0.6)" }}>{`"${correo}"`}</h3>
          </div>

          <p>Introduce la nueva contraseña</p>
          {/* <TextField label='Contraseña' variant='standard' className='fpc-textfield'/>  */}
          <PassField />
          <p>Introduce otra vez la nueva contraseña</p>
          {/* <TextField label='Confirmar contraseña' variant='standard' className='fpc-textfield'/>   */}
          <PassField />
          {message && <p style={{color: 'rgb(0,0,0,0.7)'}}>{message}</p>}
          {error && <p style={{color: 'rgb(255,0,0,0.7)'}}>{error}</p>}
          <div className="btn-recover-account">
            <Button variant="outlined" type="submit">
              Cambiar contraseña
            </Button>
          </div>
        </form>
      </div>
      : <SuccessCase/>
    }
    </>
  );
};
