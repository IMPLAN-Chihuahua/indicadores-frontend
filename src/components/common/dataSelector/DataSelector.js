import React, { useEffect } from 'react'
import { DataContext } from './DataContext'
import { dataReducer } from './dataReducer'
import './dataSelector.css'
import { DataSelectorList } from './DataSelectorList'
import { DataSelectorTable } from './DataSelectorTable'

export const DataSelector = ({topic,dispatch}) => {

  useEffect(() => {
    dispatch({
      type:'clear'
    })
  }, [topic])


  return (
    <div className='ds-container'>
      <DataSelectorTable topic={topic} dispatch={dispatch} />
      <DataSelectorList topic={topic} dispatch={dispatch}/>
    </div>
  )
}
