import { Box, Tab, Tabs } from '@mui/material';
import React from 'react'
import FormulaView from './Formula/FormulaView';
import { GeneralView } from './GeneralView';
import { HistoricosView } from './Historicos/HistoricosView';
import './indicator.css'
import MapView from './Mapa/MapView';

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
};

export const Indicator = () => {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      className='indicator-background'
      >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="componentes del indicador"
          variant='scrollable'
          scrollButtons='auto'
          sx={{ backgroundColor: 'white' }}
        >
          <LinkTab label="General" />
          <LinkTab label="Fórmula" />
          <LinkTab label="Mapa" />
          <LinkTab label="Históricos" />
        </Tabs>
      </Box>
      {
        value === 0 ? <GeneralView />
          : value === 1 ? <FormulaView />
            : value === 2 ? <MapView />
              : value === 3 ? <HistoricosView />
                : null
      }
    </Box>
  )
}

