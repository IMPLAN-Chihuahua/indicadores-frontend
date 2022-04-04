import React, { useEffect } from 'react'
import { DataContext } from './DataContext'
import { dataReducer } from './dataReducer'
import './dataSelector.css'
import { DataSelectorList } from './DataSelectorList'
import { DataSelectorTable } from './DataSelectorTable'

export const DataSelector = ({topic}) => {
  const init = () => {
    return []
  } 
  const [dataList, dispatch] = React.useReducer(dataReducer, [], init)

  useEffect(() => {
    dispatch({
      type:'clear'
    })
  }, [topic])


  return (
    <DataContext.Provider value={dataList}>
    <div className='ds-container'>
      <DataSelectorTable topic={topic} dispatch={dispatch} />
      <DataSelectorList topic={topic} dispatch={dispatch}/>
    </div>
    </DataContext.Provider>
  )
}
