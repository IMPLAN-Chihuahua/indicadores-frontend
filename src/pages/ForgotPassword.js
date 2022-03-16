import { Fade } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { Link, Link as RouterLink} from 'react-router-dom';
import { ErrorCase } from '../components/forgotPassword/ErrorCase';
import { InitialCase } from '../components/forgotPassword/InitialCase'
import { UpdatedCase } from '../components/forgotPassword/UpdatedCase';
import './styles/forgotPassword.css'


export const ForgotPassword = () => {
    const [showFP, setShowFP] = useState(false)
    const currentUrl = window.location.href;
    const token = currentUrl.split('/')[4];
    let opt;
    /**
     * opt description:
     * 1 - initial case, no token
     * 2 - update case, token valid
     * 3 - invalid token
     */
    (!token)
    ? opt = 1
    : opt = 2
    
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
