import { Done, PublicRounded, YoutubeSearchedForSharp } from '@mui/icons-material';
import { Button, Input, Link, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { emailSchema } from '../../utils/validator';

import { publicApi } from '../../services';
import { BeatLoader, HashLoader } from 'react-spinners';
import './FpCases.css'


export const InitialCase = () => {

  const [validEmail, setValidEmail] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    let formData = {
      correo: e.target[0].value
    }
    const isValid = await emailSchema.isValid(formData)
      .then(res => {
        if (res) {
          publicApi.post('/auth/password-reset', JSON.stringify(formData))
            .then(res => {
              setLoading(false)
              setMessage(res.data.message)
            })
            .catch(err => {
              setLoading(false)
              setMessage(err)
            })
          setValidEmail(true)
        } else {
          setLoading(false)
          setValidEmail(false)
        }
      })
      .catch(err => {
        console.log(err)
        setLoading(true)
      })
  }

  return (
    <>
      <div className='fpc-container-all'>
        {(loading) && <div className='loading'><HashLoader /></div>}
        <form onSubmit={handleSubmit} className="fpc-container">
          <h1 style={{ textAlign: "center" }}>Recuperación de cuenta</h1>
          <p>
            ¿Perdiste tu contraseña? Por favor, introduzca su nombre de usuario o
            dirección de correo electrónico. Recibirá un enlace para crear una
            nueva contraseña por correo electrónico.
          </p>
          <TextField
            label="Correo electronico"
            name="email"
            variant="standard"
            className="fpc-textfield"
            autoComplete='off'
            type="text"
          />

          {(!validEmail) && <p style={{ color: 'rgb(255,0,0,0.7)' }}>Por favor, ingresa un correo valido</p>}
          {(message) && <p style={{ color: 'rgb(0,0,0,0.7)' }}>{message}</p>}

          <div className="btn-recover-account">
            <Button
              variant="outlined"
              type="submit"
            >Recuperar contraseña
            </Button>
          </div>
          <div className="fp-fotter">
            <hr />
            <Link
              component={RouterLink}
              to="/login"
              underline="hover"
              variant="body1"
            >
              ¿Recordaste tu contraseña?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
