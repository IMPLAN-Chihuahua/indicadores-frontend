import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Navbar } from './components/navbar/Navbar'
import { Sidebar } from './components/sidebar/Sidebar'
import eventBus from '../../utils/EventBus'
import './dashboard.css'
import { Alert } from '../common/Alert'

export const Dashboard = () => {
  const { handleLogOut } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    eventBus.on('logout', () => {
      handleLogOut();
    });

    return () => {
      eventBus.remove('logout', () => navigate('/login', { replace: true }));
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className='container'>
        <Sidebar />
        <div className='content'>
          <Outlet />
        </div>
      </div>
      <Alert />
    </>
  )
}

