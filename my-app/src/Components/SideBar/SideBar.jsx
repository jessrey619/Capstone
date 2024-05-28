import React from 'react';
import './sideBar.css';
import navList from '../../data/navItem';
import { Link } from 'react-router-dom'


function SideBar() {
  return <aside id='sidebar' className='sidebar'>
    <ul className='sidebar-nav' id='sidebar-nav'>
        {navList.map(nav => (
            <li className='nav-item' key={nav._id}>
                <Link to={nav.link} className='nav-link collapsed'>
                    <i className={nav.icon}></i>
                    <span>{nav.name}</span>
                </Link>
            </li>
        ))}
    </ul>
  </aside>
}

export default SideBar