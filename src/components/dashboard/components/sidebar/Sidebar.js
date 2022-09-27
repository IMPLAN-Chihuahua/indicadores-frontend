import React, { useState } from 'react'
import { Link, useMatch } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { Lock } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import MenuIcon from '@mui/icons-material/Menu';
import './sidebar.css'

export const SIDEBAR_KEY = 'indicadores-sidebar-mode';

export const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(() => JSON.parse(localStorage.getItem(SIDEBAR_KEY) || 'true'));
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
    to: '/modulos',
    label: 'Temas',
    icon: <ViewModuleIcon className='sidebar-icon' />
  },
  {
    to: '/indicadores',
    label: 'Indicadores',
    icon: <BubbleChartIcon className='sidebar-icon' />
  }, {
    to: '/autorizacion',
    label: 'Autorización',
    icon: <Lock className='sidebar-icon' />
  }
  ]

  return (
    <div className={`sidebar ${isSidebarOpen && 'sidebar-min'}`}>
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
    </div>
  )
};

const SidebarItem = (props) => {
  const match = useMatch(props.to);

  return (
    <li className='sidebar-list-item'>
      <Link to={props.to} className={`sidebar-link ${match && 'sidebar-link-active'}`}>
        {props.icon}
        {!props.isSidebarOpen && <span>{props.label}</span>}
      </Link>
    </li>
  );
}
