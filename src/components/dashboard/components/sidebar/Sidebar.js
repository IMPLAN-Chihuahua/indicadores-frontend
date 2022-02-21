import React, { useEffect, useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import MenuIcon from '@mui/icons-material/Menu';

import './sidebar.css'
import { Link } from 'react-router-dom';

export const Sidebar = () => {

    const [show, setShow] = useState(true);

    const [activeHome, setActiveHome] = useState('active');
    const [activeUsers, setActiveUsers] = useState('');
    const [activeModules, setActiveModules] = useState('');
    const [activeIndicators, setActiveIndicators] = useState('');

    const handleShow = () => {setShow(!show);}

    const handleActiveHome = () => {(activeHome == '') && setActiveHome('active'); setActiveUsers(''); setActiveModules(''); setActiveIndicators('')}
    const handleActiveUsers = () => {(activeUsers == '') && setActiveUsers('active'); setActiveHome(''); setActiveModules(''); setActiveIndicators('')}
    const handleActiveModules = () => {(activeModules == '') && setActiveModules('active'); setActiveUsers(''); setActiveHome(''); setActiveIndicators('')}
    const handleActiveIndicators = () => {(activeIndicators == '') && setActiveIndicators('active'); setActiveUsers(''); setActiveModules(''); setActiveHome('')}
    

    return (
        <>
        <div className={show ? 'sidebar' : 'sidebar-min'}>
        <div className='sidebar-wrapper'>
                    <div className='sidebar-menu'>
                    <h3 className='sidebar-title'>
                        <button className='sidebar-button' onClick={handleShow}>
                        <MenuIcon className='sidebar-icon-title' /> 
                        </button>
                        <span className={show ? 'sidebar-title-text' : 'sidebar-title-text-min'}>Menu</span>
                    </h3>
                        <ul className={show ?'sidebar-list':'sidebar-list-min'}>
                        
                        <Link to='/' className='link'>
                        <li className={show ?`sidebar-list-item ${activeHome}`:`sidebar-list-item-min ${activeHome}`} onClick={handleActiveHome}>
                            <HomeIcon className='sidebar-icon'/> 
                            <span>Inicio</span>
                        </li>
                        </Link>
                          <Link to='usuarios' className='link'>
                        <li className={show?`sidebar-list-item ${activeUsers}`:`sidebar-list-item-min ${activeUsers}`} onClick={handleActiveUsers}>
                            <GroupIcon className='sidebar-icon'/> 
                            <span>Usuarios</span>
                        </li>
                          </Link>
                        
                        <Link to='modulos' className='link'>
                        <li className={show?`sidebar-list-item ${activeModules}` :`sidebar-list-item-min ${activeModules}`} onClick={handleActiveModules}>
                            <ViewModuleIcon className='sidebar-icon'/> 
                            <span>Modulos</span>
                        </li>
                        </Link>

                        <Link to='indicadores' className='link'>
                        <li className={show?`sidebar-list-item ${activeIndicators}`:`sidebar-list-item-min ${activeIndicators}`} onClick={handleActiveIndicators}>
                            <BubbleChartIcon className='sidebar-icon'/> 
                            <span>Indicadores</span>
                        </li>
                        </Link>
                        </ul>
                     </div>
                </div>
        </div>
        </>
  )
}
