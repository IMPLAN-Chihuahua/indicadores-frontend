import React, { useState } from 'react'
import { Link, useMatch } from 'react-router-dom';
import { Box, IconButton, Paper } from '@mui/material';
import { Lock } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import MenuIcon from '@mui/icons-material/Menu';
import './sidebar.css'
import { useAuth } from '../../../../contexts/AuthContext';
import { isAdmin } from '../../../../utils/userValidator';
import DashboardIcon from '@mui/icons-material/Dashboard';

export const SIDEBAR_KEY = 'indicadores-sidebar-mode';

export const Sidebar = () => {

  const [isSidebarOpen, setSidebarOpen] = useState(() => localStorage.getItem(SIDEBAR_KEY) === 'true');
  const toggleSidebar = () => {
    setSidebarOpen(prevOpen => {
      const isOpen = !prevOpen;
      localStorage.setItem(SIDEBAR_KEY, isOpen);
      return isOpen;
    })
  };


  const routes = [{
    to: '/',
    label: 'Inicio',
    icon: <HomeIcon className='sidebar-icon' />
  }, {
    to: '/usuarios',
    label: 'Usuarios',
    icon: <GroupIcon className='sidebar-icon' />
  }, {
    to: '/temas',
    label: 'Temas',
    icon: <ViewModuleIcon className='sidebar-icon' />
  },
  {
    to: '/indicadores',
    label: 'Indicadores',
    icon: <BubbleChartIcon className='sidebar-icon' />
  },
  {
    to: '/objetivos',
    label: "Objetivos",
    icon: <DashboardIcon className='sidebar-icon' />
  }
  ]

  return (
    <Box sx={{ borderRight: 1, borderColor: 'divider' }} className={`sidebar ${isSidebarOpen && 'sidebar-min'}`}>
      <IconButton aria-label='menu' onClick={toggleSidebar} sx={{ marginLeft: '.5rem' }}>
        <MenuIcon />
      </IconButton>

      <div className='sidebar-wrapper'>
        <ul className='sidebar-list'>
          {
            routes.map((r, idx) => (
              <SidebarItem key={idx} {...r} isSidebarOpen={isSidebarOpen} />
            ))
          }
        </ul>
      </div>
    </Box>
  )
};

const SidebarItem = (props) => {
  const match = useMatch(props.to);
  const { user } = useAuth();
  return (
    <>
      {
        ((props.label === 'Autorización' || props.label === 'Usuarios' || props.label === 'Objetivos') && !isAdmin(user)) ?
          <></>
          :
          <li className='sidebar-list-item' style={{ marginBottom: '3px' }}>
            <Link to={props.to} className={`sidebar-link ${match && 'sidebar-link-active'}`}>
              {props.icon}
              {!props.isSidebarOpen && <span>{props.label}</span>}
            </Link>
          </li>
      }
    </>
  );
}
