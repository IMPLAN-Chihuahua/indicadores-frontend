import { Box, Typography } from '@mui/material'
import React from 'react'

const CharCounter = (props) => {
  const { error, value } = props;
  return (
    <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <span>{error ? error.message : ''}</span>

      <Typography component="span" variant="caption" color="text.secondary">
        {value ? value.length : 0} caracteres
      </Typography>
    </Box>
  )
}

export default CharCounter