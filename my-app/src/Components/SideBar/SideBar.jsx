import React from 'react';
import './sideBar.css';
import navList from '../../data/navItem';

function SideBar() {
  return <aside id='sidebar' className='sidebar'>
    <ul className='sidebar-nav' id='sidebar-nav'>
        {navList.map(nav => (
            <li className='nav-item' key={nav._id}>
                <a className='nav-link collapsed' href='#'>
                    <i className={nav.icon}></i>
                    <span>{nav.name}</span>
                </a>
            </li>
        ))}
    </ul>
  </aside>
}

export default SideBar