import { Box, Tab, Tabs } from '@mui/material';
import React from 'react'
import FormulaView from './Formula/FormulaView';
import { GeneralView } from './GeneralView';
import { HistoricosView } from './Historicos/HistoricosView';
import './indicator.css'

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
    <Box sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className='indicador-tab'>
        <LinkTab label="Indicador" />
        <LinkTab label="Fórmula" />
        <LinkTab label="Históricos" />
      </Tabs>
      {
        value === 0 ? <GeneralView />
          : value === 1 ? <FormulaView />
            : value === 2 ? <HistoricosView />
              : null
      }
    </Box>
  )
}

