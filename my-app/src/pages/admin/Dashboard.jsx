import React, {useState, useEffect} from 'react'
import '../../Components/Main/main.css';
import PageTitle from '../../Components/Main/PageTitle';
import Card from '../../Components/Card/Card';

function Dashboard() {
  return (
    <main id='main' className='main'>
      <PageTitle page="Dashboard"/>
      <section className='dashboard section'>
        <div className='row'>
          <div className='col-lg-9'>
            <div className='row'>
            <Card/>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Dashboard