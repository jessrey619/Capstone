import React from 'react'
import '../../Components/Main/main.css';
import PageTitle from '../../Components/Main/PageTitle';
import Header from '../../Components/AdminHeader/Header';
import SideBar from '../../Components/SideBar/SideBar';

function ApplicationList() {
  return (
    <main id='main' className='main'>
      <PageTitle page="Application List"/>
    </main>
  )
}

export default ApplicationList