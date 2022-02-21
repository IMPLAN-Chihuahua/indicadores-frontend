import React from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/navbar/Navbar'
import { Sidebar } from './components/sidebar/Sidebar'
import './dashboard.css'

export const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className='container'>
        <Sidebar />
        <div className='content'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

