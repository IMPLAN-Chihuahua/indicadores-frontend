import { Tab, Tabs } from '@mui/material';
import React from 'react'
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
    <>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <LinkTab label="Indicador" />
        <LinkTab label="Fórmula" />
        <LinkTab label="Históricos" />
      </Tabs>
      {
        value === 0 ? <GeneralView />
          : value === 1 ? <h1>TBD</h1>
            : value === 2 ? <HistoricosView />
              : null
      }
    </>
  )
}

