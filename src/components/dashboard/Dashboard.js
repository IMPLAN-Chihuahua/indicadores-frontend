import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Featured } from './components/home/featured/Featured'
import { Indicators } from './components/home/Indicators/Indicators'
import { Modules } from './components/home/Modules/Modules'
import { Users } from './components/home/Users/Users'
import {Navbar} from './components/navbar/Navbar'
import {Sidebar} from './components/sidebar/Sidebar'
import './dashboard.css'

export const Dashboard = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <div className='container'>
    <Sidebar/>
    <div className='content'>
    <Routes>
      <Route path='/' element={<Featured/>}/>
      <Route path='/usuarios' element={<Users/>}/>
      <Route path='/modulos' element={<Modules/>}/>
      <Route path='/indicadores' element={<Indicators/>}/>
    </Routes>
    </div>
    </div>

   
    </BrowserRouter>
    </>
  )
}

