import { Avatar, Box, Grid, Skeleton } from '@mui/material'
import React, { useState, useEffect } from 'react'
import useIsMounted from '../../../../../hooks/useIsMounted'
import { getLastedIndicators, getLastedModules, getLastedUsers } from '../../../../../services/userService'
import './lastedRecords.css'

export const LastedRecords = () => {
  const skeletonArray = [1, 2, 3, 4, 5];
  const isMounted = useIsMounted();
  const [users, setUsers] = useState([])
  const [modules, setModules] = useState([])
  const [indicators, setIndicators] = useState([])

  useEffect(() => {
    getLastedUsers()
      .then(res => {
        if (isMounted()) {
          setUsers(res)
        }
      })

    getLastedModules()
      .then(res => {
        if (isMounted()) {
          setModules(res)
        }
      })

    getLastedIndicators()
      .then(res => {
        if (isMounted()) {
          setIndicators(res)
        }
      })
  }, [isMounted])

  return (
    <>
      <Box className='margin-top-home'>
        <Box className='lasted-title' >
          Últimos registros
          <hr />
        </Box>

        <Grid container spacing={4} className='lasted-grid'>
          <Grid item xs={12} md={6} lg={5} className='lasted-box'>

            <Box className='lasted-box-users'>
              <Box className='lasted-box-users-container'>

                <span className='lasted-item-title'>Usuarios</span>
                <hr />
                {
                  users.length > 0 ?
                    users.slice((users.length - 7), users.length).reverse().map((user, i) => {
                      return (
                        <Box key={user.id}>
                          <Box className={`lasted-all-item ${(i % 2 == 1) && 'active'}`}>
                            <Box className='lasted-all-left'>
                              <Box className='lasted-picture'>
                                <Box className='lasted-picture-item'>
                                  <Avatar alt={user.nombres} src={user.urlImagen} sx={{ height: 45, width: 45 }} className="lasted-picture-hoverable" />
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
                    :
                    skeletonArray.map((item, i) => {
                      return (
                        <Box key={item}>
                          <Box>
                            <Box className='lasted-all-left'>
                              <Box className=''>
                                <Box className=''>
                                  <Skeleton variant="circular" width={45} height={45} className="" />
                                </Box>
                              </Box>
                              <Box className='lasted-all-info'>
                                <Skeleton variant="text" width={100} height={20} className='lasted-all-name' />
                                {/* <span className='lasted-all-name'>{user.nombres}</span> */}
                              </Box>
                            </Box>
                            <Box className='lasted-status'>
                              <Skeleton variant="text" width={'100%'} height={20} className='lasted-status-text' />
                              {/* <span className={`lasted-status-text ${(user.activo == 'SI' ? 'active' : '')}`}>{`${(user.activo == 'SI' ? 'Activo' : 'Inactivo')}`}</span> */}
                            </Box>
                          </Box>
                        </Box>
                      )
                    })
                }
              </Box>

            </Box>
          </Grid>

          <Grid item xs={12} md={6} lg={7} className='lasted-right-box'>
            <Box className='lasted-box-modules'>
              <span className='lasted-item-title'>Temas de interés</span>
              <hr />
              {
                modules.slice((modules.length - 3), modules.length).reverse().map((modules, i) => {
                  return (
                    <Box key={modules.id}>
                      <Box className={`lasted-all-item ${(i % 2 == 1) && 'active'}`}>
                        <Box className='lasted-all-left'>
                          <Box className='lasted-picture'>
                            <Box className='lasted-picture-item-modules'>
                              <Avatar alt={modules.temaIndicador} src={modules.urlImagen} sx={{ height: 45, width: 45 }} className="lasted-picture-hoverable" />
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
              <hr />
              {
                indicators.slice((indicators.length - 3), indicators.length).reverse().map((indicator, i) => {
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
                          <span className={`lasted-code-text`} title="FID">{indicator.id}</span>
                        </Box>
                      </Box>
                    </Box>
                  )
                })

              }
            </Box>

          </Grid>



        </Grid>

      </Box>
    </>
  )
}
