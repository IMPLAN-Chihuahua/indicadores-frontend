import { Box, FormControl, MenuItem, Select, InputLabel, FormGroup, FormControlLabel, Checkbox, Typography } from '@mui/material'
import React from 'react'

const ODSSelector = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Objetivos de Desarrollo Sostenible</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value={10}>ODS 1</MenuItem>
        <MenuItem value={20}>ODS 2</MenuItem>
        <MenuItem value={30}>ODS 3</MenuItem>
      </Select>
    </FormControl>
  )
}

const ODSTable = () => {

  return (
    <Box sx={{
      height: '100%',
    }}>
      <ODSSelector />
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
        <FormControlLabel control={<Checkbox />} label="Meta 1 del ODS seleccionado" />
        <FormControlLabel control={<Checkbox />} label="Meta 2 del ODS seleccionado" />
        <FormControlLabel control={<Checkbox />} label="Meta 3 del ODS seleccionado" />
        <FormControlLabel control={<Checkbox />} label="Meta 1 del ODS seleccionado" />
        <FormControlLabel control={<Checkbox />} label="Meta 2 del ODS seleccionado" />
      </Box>

    </Box>
  )
}


export default ODSTable