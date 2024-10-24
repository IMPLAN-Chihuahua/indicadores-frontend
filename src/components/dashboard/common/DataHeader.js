import { Box, Paper, Stack, Typography } from '@mui/material'
import './common.css'
import { memo } from 'react';

const PageHeader = memo(({ title = '', SearchBar, children }) => {
  return (
    <Box position='sticky' maxWidth='100%' mb={2} overflow='hide'>
      <Paper pb={2} pt={2} variant='outlined'>
        {title && <Typography variant='h4' m={2}>{title}</Typography>}
        <Stack direction='row' pb={3} flexWrap='wrap' rowGap={3}>
          <Box flex={1} px={3} minWidth='600px'>
            {SearchBar}
          </Box>
          <Stack flex={1} direction='row' columnGap={2} px={2} justifyContent={{ xl: 'flex-end', xs: 'flex-start' }}>
            {children}
          </Stack>
        </Stack>
      </Paper>
    </Box>
  )
})


export default PageHeader;