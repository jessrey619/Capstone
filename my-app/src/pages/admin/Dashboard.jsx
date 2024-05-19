import React, {useState, useEffect} from 'react'
import '../../Components/Main/main.css';
import PageTitle from '../../Components/Main/PageTitle';
import Card from '../../Components/Card/Card';

function Dashboard() {

  const [card, setCards] = useState([])


  return (
    <main id='main' className='main'>
      <PageTitle page="Dashboard"/>
      <section className='dashboard section'>
        <div className='row'>
          <div className='col-lg-8'>
            <div className='row'>
            </div>
          </div>
          <div className='col-lg-4'></div>
        </div>
      </section>
    </main>
  )
}

export default Dashboard