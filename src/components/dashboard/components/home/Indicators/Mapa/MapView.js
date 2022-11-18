import { Box, Button, DialogActions, DialogContent, DialogTitle, Grid, Paper, Stack, Typography } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { IndicadorProvider } from "../../../../../../contexts/IndicadorContext"
import useIsMounted from "../../../../../../hooks/useIsMounted"
import { createMapa, getMapa } from "../../../../../../services/indicatorService"
import { updateMapa } from "../../../../../../services/mapaService"
import { showAlert } from "../../../../../../utils/alert"
import PersonalLoader from "../../../../../common/PersonalLoader/PersonalLoader"
import FormDialog from "../../../../common/FormDialog"
import { defaultMapa, FormMapa } from "../../../../forms/mapa/FormMapa"

const MapView = () => {
  const { id: idIndicador } = useParams();
  const [mapa, setMapa] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const isMounted = useIsMounted();
  const parseMapToFormData = mapObj => {
    const fd = new FormData();
    for (const field in mapObj) {
      if (field === 'urlImagen') {
        fd.append(field, mapObj[field][0] || null);
        continue;
      }
      if (mapObj[field]) {
        fd.append(field, mapObj[field]);
        continue;
      }
    }
    return fd;
  };
  const handleUpdate = (data) => {
    const parsed = parseMapToFormData(data);
    showAlert({
      title: '¿Deseas actualizar el mapa de este indicador?',
      text: `Al actualizar este registro, los cambios generados se actualizarán
       en Chihuahua Métrica y en el sistema de gestión de Chihuahua en Datos.`,
      icon: 'question',
      showCancelButton: true
    })
      .then(option => {
        if (option.isConfirmed) {
          return updateMapa(mapa.id, parsed);
        }
      })
      .then(res => {
        if (res) {
          showAlert({
            title: 'Actualización existosa',
            icon: 'success',
            text: 'El mapa del indicador ha sido actualizado'
          });
          fetchMapa();
        }
      })
      .catch(err => {
        showAlert({
          title: 'Hubo un error',
          text: err,
          icon: 'error'
        })
      })
  }

  const handleCreate = (data) => {
    const parsed = parseMapToFormData(data);
    showAlert({
      title: '¿Deseas crear el mapa para este indicador?',
      text: `Al crear este registro, los cambios generados se actualizarán
       en Chihuahua Métrica y en el sistema de gestión de Chihuahua en Datos.`,
      icon: 'question',
      showCancelButton: true
    }).then(option => {
      if (option.isConfirmed) {
        return createMapa(idIndicador, parsed);
      }
    })
      .then(res => {
        if (res) {
          showAlert({
            title: 'Mapa creado exitosamente',
            icon: 'success',
            text: 'El mapa del indicador ha sido creado'
          })
          setOpen(false)
          fetchMapa();
        }
      })
      .catch(err => {
        showAlert({
          title: 'Hubo un error',
          text: err,
          icon: 'error'
        })
      })
  }

  const fetchMapa = useCallback(() => {
    setLoading(true);
    getMapa(idIndicador)
      .then(res => {
        if (isMounted()) {
          if (res.data.data) {
            const mapObj = res.data.data;
            setMapa({
              ...mapObj,
              ...(mapObj.urlImagen && { urlImagen: [mapObj.urlImagen] })
            });
          }
        }
      })
      .catch(err => {
        showAlert({
          title: 'Hubo un error',
          icon: 'error',
          text: err
        })
      })
      .finally(_ => setLoading(false))
  }, [idIndicador, isMounted])

  useEffect(() => {
    fetchMapa();
  }, [fetchMapa])
  
  return (
    <>
      <Box
        className='indicator'
        sx={{ overflow: 'scroll', flex: '1 1 auto', height: '500px' }}
        padding={3}
      >
        {
          isLoading ? (<PersonalLoader />)
            : Object.keys(mapa).length > 0
              ? (
                <Stack direction='column' gap={1} height='100%'>
                  <Paper
                    component={Grid}
                    item
                    padding={3}
                  >

                    <IndicadorProvider
                      indicador={{ mapa }}
                      onSubmit={handleUpdate}
                    >
                      <FormMapa defaultTitle={false} />
                      <DialogActions>
                        <Button type='submit' form='form-mapa' variant='contained'>Guardar</Button>
                      </DialogActions>
                    </IndicadorProvider>
                  </Paper>
                  <Paper
                    component={Stack}
                    direction='column'
                    padding={3}
                    height='100%'
                  >
                    <Typography variant='h5' mb={2}>Vista del dashboard</Typography>
                    <iframe
                      src={mapa.url}
                      width='100%'
                      height='500px'
                      style={{ border: '1px solid #d2d2d2', borderRadius: '5px' }}>
                    </iframe>
                  </Paper>
                </Stack>
              )
              : (
                <Paper
                  sx={{ p: 2 }}
                >
                  <Typography mb={1} variant='body1'>Este indicador no cuenta con un mapa</Typography>
                  <Button variant='contained' onClick={() => setOpen(true)}>Agregar Mapa</Button>
                </Paper>
              )
        }
      </Box>
      <FormDialog
        open={open}
        handleClose={() => setOpen(false)}
      >
        <IndicadorProvider
          indicador={{ mapa: defaultMapa }}
          onSubmit={handleCreate}
        >
          <DialogContent>
            <FormMapa defaultTitle />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} variant='text'>Cancelar</Button>
            <Button type='submit' form='form-mapa' variant='contained'>Guardar</Button>
          </DialogActions>
        </IndicadorProvider>
      </FormDialog>
    </>
  )
}

export default MapView