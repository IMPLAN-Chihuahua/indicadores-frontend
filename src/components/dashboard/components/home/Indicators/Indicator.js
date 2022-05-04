import { Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { GeneralView } from './GeneralView';
import './indicator.css'
import {
  Route,
  Link,
  Outlet
} from 'react-router-dom';

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
        <LinkTab label="Page One" href="/drafts" />
        <LinkTab label="Page Two" href="/trash" />
        <LinkTab label="Page Three" href="/spam" />
      </Tabs>
      {
        value === 0 ? <GeneralView />
          : value === 1 ? <h1>TBD</h1>
            : value === 2 ? <h1>TBDDD</h1>
              : null
      }
    </>
  )
}

