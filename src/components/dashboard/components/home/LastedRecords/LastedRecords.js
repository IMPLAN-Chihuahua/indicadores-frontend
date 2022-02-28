import { Box, Grid } from '@mui/material'
import React, {useState, useEffect,useRef} from 'react'
import { getIndicators, getModules, getUsers } from '../../../../../services/userService'
import './lastedRecords.css'



export const LastedRecords = () => {
  
  const [users, setUsers] = useState([])
  const [modules, setModules] = useState([])
  const [indicators, setIndicators] = useState([])

  const isMounted = useRef(true);


useEffect(() => {
  isMounted.current
  ?
  getUsers()
  .then(res  => {
    setUsers(res)
  })
  .catch(err  => {
    setUsers([])
  })
  : setUsers([])
    return ()=>{
    isMounted.current = false;    
    }
    
    // getModules()
    // .then(res  => {
    //   setModules(res)
    // })
    // .catch(err  => {
    //   setModules([])
    // });  

    // getIndicators()
    // .then(res  => {
    //   setIndicators(res)
    // })
    // .catch(err  => {
    //   setIndicators([])
    // });  

  }, [])


  return (
    <>
    <Box className='margin-top-home'>
    <Box className='lasted-title' >
      Ultimos registros
      <hr/>
    </Box>

    <Grid container spacing={2} className='lasted-grid'>
    <Grid item xs={12} md={6} lg={5} className='lasted-box'>
   
    <Box className='lasted-box-users'> 
    <span className='lasted-item-title'>Usuarios</span>
    <hr/>
{
  users.slice((users.length-7),users.length).reverse().map( (user,i) => {
    return (
      <Box key={user.id}>
    <Box className={`lasted-all-item ${(i % 2 == 1) && 'active'}`}>
      <Box className='lasted-all-left'>
      <Box className='lasted-picture'>
        <Box className='lasted-picture-item'>
        ✨
        </Box>
      </Box>
      <Box className='lasted-all-info'>
      <span className='lasted-all-name'>{user.nombres}</span>
      </Box>
      </Box>
      <Box className='lasted-status'>
        <span className={`lasted-status-text ${(user.activo == 'SI' ? 'active' : '')}`}>{`${(user.activo == 'SI' ? 'Activo' : 'Inactivo')}`}</span>
      </Box>
    </Box>
      </Box>
    )
  })
    
}
  
    </Box>
    </Grid>
    
    {/* <Grid item xs={12} md={6} lg={7} className='lasted-right-box'>
    <Box className='lasted-box-modules'> 
    <span className='lasted-item-title'>Modulos</span>
    <hr/>
{
  modules.slice((modules.length-3),modules.length).reverse().map( (modules,i) => {
    return (
      <Box key={modules.id}>
    <Box className={`lasted-all-item ${(i % 2 == 1) && 'active'}`}>
      <Box className='lasted-all-left'>
      <Box className='lasted-picture'>
        <Box className='lasted-picture-item-modules'>
        💫
        </Box>
      </Box>
      <Box className='lasted-all-info'>
      <span className='lasted-all-name'>{modules.temaIndicador}</span>
      </Box>
      </Box>
      <Box className='lasted-status'>
        <span className={`lasted-code-text`}>{modules.codigo}</span>
      </Box>
    </Box>
      </Box>
    )
  })
    
}
    </Box>


    <Box className='lasted-box-indicators'>
    <span className='lasted-item-title'>Indicadores</span>
    <hr/>
{
  indicators.slice((indicators.length-3),indicators.length).reverse().map( (indicator,i) => {
    return (
      <Box key={indicator.id}>
    <Box className={`lasted-all-item ${(i % 2 == 1) && 'active'}`}>
      <Box className='lasted-all-left'>
      <Box className='lasted-picture'>
        <Box className='lasted-picture-item-indicators'>
        ⭐
        </Box>
      </Box>
      <Box className='lasted-all-info'>
      <span className='lasted-all-name'>{indicator.nombre}</span>
      </Box>
      </Box>
      <Box className='lasted-status'>
        <span className={`lasted-code-text`}>{modules.codigo}</span>
      </Box>
    </Box>
      </Box>
    )
  })
    
}
    </Box>

    </Grid> */}
    
    
    
    </Grid>

    </Box>
    </>
  )
}
