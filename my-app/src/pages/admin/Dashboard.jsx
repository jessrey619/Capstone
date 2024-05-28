import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../components/Main/main.css';
import PageTitle from '../../components/PageTitle/PageTitle';
import CardsContainer from '../../components/Card/CardsContainer'; // Ensure this import path is correct
import AdminHeader from '../../components/AdminHeader/AdminHeader';

function Dashboard() {
  const [vehicleCounts, setVehicleCounts] = useState({
    totalVehicles: 0,
    fourWheelers: 0,
    twoWheelers: 0,
  });

  useEffect(() => {
    axios.get('http://localhost:8080/logs/vehicle-types/count')
      .then(response => {
        const fourWheel = response.data.fourWheelCount;
        const twoWheel = response.data.otherCount;
        const total = fourWheel + twoWheel;
        setVehicleCounts({
          totalVehicles: total,
          fourWheelers: fourWheel,
          twoWheelers: twoWheel,
        });
      })
      .catch(error => {
        console.error('Error fetching vehicle counts:', error);
      });
  }, []);

  const cardsData = [
    { title: 'Total Vehicles', count: vehicleCounts.totalVehicles, iconClass: 'bi-car-front' },
    { title: 'Total 4 Wheelers', count: vehicleCounts.fourWheelers, iconClass: 'bi-truck' },
    { title: 'Total 2 Wheelers', count: vehicleCounts.twoWheelers, iconClass: 'bi-bicycle' },
  ];

  return (
    
    <>
      
      <main id='main' className='main'>
      <PageTitle page="Dashboard"/>
      <section className='dashboard section'>
        <CardsContainer cards={cardsData} />
      </section>
    </main>
    </>
    
  );
}

export default Dashboard;
