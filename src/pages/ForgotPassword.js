import { Fade } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { Link, Link as RouterLink} from 'react-router-dom';
import { ErrorCase } from '../components/forgotPassword/ErrorCase';
import { InitialCase } from '../components/forgotPassword/InitialCase'
import { UpdatedCase } from '../components/forgotPassword/UpdatedCase';
import './styles/forgotPassword.css'
import jwt from 'jwt-decode'

export const ForgotPassword = () => {
    const [showFP, setShowFP] = useState(false)
    const currentUrl = window.location.href;
    const token = currentUrl.split('/')[4];
    const [user, serUser] = useState(null)
    let opt;
    /**
     * opt description:
     * 1 - initial case, no token
     * 2 - update case, token valid
     * 3 - invalid token
     */
    const tokenIsValid = (params) => {
        const {sub,iat,exp} = params;
        const expirationDate = new Date(0).setUTCSeconds(exp)
        const currentDate = new Date();

        if(expirationDate > currentDate){
            return true
        }else{
            return false
        }
    }

    try{
        (!token)
        ? opt = 1
        : (tokenIsValid(jwt(token)))
        ? opt = 2 
        : opt = 3
    }catch{
        opt = 3
    }
        
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
            ?<UpdatedCase token={token} />
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
