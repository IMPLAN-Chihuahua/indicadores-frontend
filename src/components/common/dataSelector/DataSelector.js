import React, { useContext, useEffect } from 'react'
import { DataContext } from './DataContext'
import './dataSelector.css'
import { DataSelectorList } from './DataSelectorList'
import { DataSelectorTable } from './DataSelectorTable'

export const DataSelector = ({ topic }) => {
  const { dispatch } = useContext(DataContext);

  useEffect(() => {
    dispatch({ type: 'clear' })
  }, [topic])


  return (
    <div className='ds-container'>
      <DataSelectorTable topic={topic} />
      <DataSelectorList topic={topic} />
    </div>
  )
}
