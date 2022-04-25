import React, { useEffect, useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import MenuIcon from '@mui/icons-material/Menu';

import './sidebar.css'
import { Link, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import {Circle, Lock } from '@mui/icons-material';

export const Sidebar = () => {

    const [show, setShow] = useState(true);
    const location = useLocation();

    const [activeHome, setActiveHome] = useState('');
    const [activeUsers, setActiveUsers] = useState('');
    const [activeModules, setActiveModules] = useState('');
    const [activeIndicators, setActiveIndicators] = useState('');
    const [activeIndicator, setActiveIndicator] = useState('');
    const [activeRelationship, setActiveRelationship] = useState('');

    const handleShow = () => {setShow(!show);}
    
    const clearActive = () => {
        setActiveHome('');
        setActiveUsers('');
        setActiveModules('');
        setActiveIndicators('');
        setActiveIndicator('');
        setActiveRelationship('');
    }

    useEffect(() => {
      clearActive()
      switch (location.pathname) {
          case '/':
              setActiveHome('active');
              break;
        
          case '/usuarios':
              setActiveUsers('active');
              break;
        
          case '/modulos':
              setActiveModules('active');
              break;
        
          case '/indicadores':
              setActiveIndicators('active');
              break;
          case '/indicadores/:id':
              setActiveIndicator('active');
              break;
          case '/autorizacion':
                setActiveRelationship('active');
                break;
          default:
              break;
      }
    }, [location.pathname])

    return (
        <>
        <Box className={show ? 'sidebar' : 'sidebar-min'}>
        <Box className='sidebar-wrapper'>
                    <Box className='sidebar-menu'>
                    <h3 className='sidebar-title'>
                        <button className='sidebar-button' onClick={handleShow}>
                        <MenuIcon className='sidebar-icon-title' /> 
                        </button>
                        <span className={show ? 'sidebar-title-text' : 'sidebar-title-text-min'}>Menu</span>
                 
                    </h3>
                        <ul className={show ?'sidebar-list':'sidebar-list-min'}>
                        
                        <Link to='/' className='link'>
                        <li className={show ?`sidebar-list-item ${activeHome}`:`sidebar-list-item-min ${activeHome}`}>
                            <HomeIcon className='sidebar-icon'/> 
                            <span>Inicio</span>
                        </li>
                        </Link>
                          <Link to='usuarios' className='link'>
                        <li className={show?`sidebar-list-item ${activeUsers}`:`sidebar-list-item-min ${activeUsers}`}>
                            <GroupIcon className='sidebar-icon'/> 
                            <span>Usuarios</span>
                        </li>
                          </Link>
                        
                        <Link to='modulos' className='link'>
                        <li className={show?`sidebar-list-item ${activeModules}` :`sidebar-list-item-min ${activeModules}`}>
                            <ViewModuleIcon className='sidebar-icon'/> 
                            <span>Temas</span>
                        </li>
                        </Link>

                        <Link to='indicadores' className='link'>
                        <li className={show?`sidebar-list-item ${activeIndicators}`:`sidebar-list-item-min ${activeIndicators}`}>
                            <BubbleChartIcon className='sidebar-icon'/> 
                            <span>Indicadores</span>
                        </li>
                        </Link>
                        
                        <Link to='autorizacion' className='link'>
                        <li className={show?`sidebar-list-item ${activeRelationship}`:`sidebar-list-item-min ${activeRelationship}`}>
                            <Lock className='sidebar-icon'/> 
                            <span>Autorizacion</span>
                        </li>
                        </Link>
                        <Link to='myComponents'>
                        <li>
                            <span>Miau</span>
                        </li>
                        </Link>
                        </ul>
                     </Box>
                </Box>
        </Box>
        </>
  )
}
