import { Fade } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { Link, Link as RouterLink} from 'react-router-dom';
import { ErrorCase } from '../components/forgotPassword/ErrorCase';
import { InitialCase } from '../components/forgotPassword/InitialCase'
import { UpdatedCase } from '../components/forgotPassword/UpdatedCase';
import './styles/forgotPassword.css'


export const ForgotPassword = () => {
    const [showFP, setShowFP] = useState(false)
    let opt = 1;
    useEffect(() => {
        setShowFP(true)
        return () => {
        setShowFP(false)
       }
      }, [])
  return (
      <>
      <Fade in={showFP} timeout={1500}>
    <div className='fp-container'>
        <div className='fp-content'>
        
        {
            (opt == 1)
            ?
            <>
            <InitialCase/>
            </>
            :(opt == 2)
            ?<UpdatedCase/>
            :(opt == 3)
            ?
            <>
            <ErrorCase/>
            </>
            :<></>

        }

        </div>
    </div>
      </Fade>
      </>
  )
}
