import { Box, Tab, Tabs } from '@mui/material';
import React from 'react'
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
    <Box >
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className='indicador-tab'>
        <LinkTab label="Indicador" />
        <LinkTab label="Fórmula" />
        <LinkTab label="Históricos" />
        <LinkTab label="Mapa" />
      </Tabs>
      {
        value === 0 ? <GeneralView />
          : value === 1 ? <h1>TBD</h1>
            : value === 2 ? <HistoricosView />
              : value === 3 ? <MapView />
                : null
      }
    </Box>
  )
}

