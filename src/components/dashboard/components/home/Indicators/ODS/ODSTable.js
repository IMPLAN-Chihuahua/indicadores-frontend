import { Box, FormControl, MenuItem, Select, InputLabel, FormGroup, FormControlLabel, Checkbox, Typography, Tooltip } from '@mui/material'
import React, { useEffect } from 'react'
import { getMetas, getOds } from '../../../../../../services/odsService'
import { Controller } from 'react-hook-form'
import { CheckCircle, PanoramaFishEye } from '@material-ui/icons';

const ODSSelector = ({ ods, selectedOds, setSelectedOds }) => {

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Objetivos de Desarrollo Sostenible</InputLabel>
      <Select
        label="ODS"
      >
        {
          ods.map((item, index) => {
            return (
              <MenuItem
                onClick={() => setSelectedOds(item)} value={item.id} key={index}>{item.titulo}</MenuItem>
            )
          })
        }
      </Select>
    </FormControl>
  )
}

const ODSTable = ({ methods }) => {
  const [selectedOds, setSelectedOds] = React.useState(1);
  const [ods, setOds] = React.useState([]);
  const [metas, setMetas] = React.useState([]);



  useEffect(async () => {
    await getOds().then(ods => {
      setOds(ods);
    });

    await getMetas(selectedOds.id).then(metas => {
      setMetas(metas);
    })
  }, [selectedOds]);

  return (
    <Box sx={{
      height: '100%',
    }}>
      <ODSSelector ods={ods} selectedOds={selectedOds} setSelectedOds={setSelectedOds} />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 150,
        maxHeight: 150,
        overflowY: 'auto',
        borderLeft: '1px solid #ccc',
        borderRight: '1px solid #ccc',
        borderBottom: '1px solid #ccc',
        p: 1,
      }}>
        <Typography variant='caption'>
          Metas que busca alcanzar este ODS
        </Typography>
        {
          metas?.rows?.map((meta, idx) => (
            <Controller
              key={meta.id}
              // name={`metas.${meta.id}`}
              control={methods.control}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      size='small'
                      icon={<PanoramaFishEye />}
                      checkedIcon={< CheckCircle />}
                      onChange={onChange}
                      value={meta.id}
                    />}
                  label={
                    <Tooltip title={meta.descripcion}>
                      <Typography>
                        {meta.titulo}
                      </Typography>
                    </Tooltip>
                  }
                  sx={{
                    borderRadius: '50px',
                    border: '1px solid #ccc',
                    p: '1px',
                    pr: '10px',
                    m: '5px',
                  }}
                  {...methods.register(`metas`)}
                />
              )}
              defaultValue={false}
            />
          ))
        }
      </Box>

    </Box>
  )
}


export default ODSTable