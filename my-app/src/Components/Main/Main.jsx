import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './main.css';
import PageTitle from './PageTitle'
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';


function Main() {
  return (
    <main id='main' className='main'>
        <Header/>
        <SideBar/>
        <PageTitle page="Dashboard"/>
        <div className='content-wrapper'></div>
    </main>
  )
}

export default Main