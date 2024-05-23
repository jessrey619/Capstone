import React from 'react';
import '../../Components/Main/main.css'
import InputBoxes from '../../Components/InputBoxes/InputBoxes';

function ParkingManagement() {
  return (
    <div>
      <h5>Vehicle Allowance</h5>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elementum tortor at lorem faucibus condimentum. Etiam id bibendum nibh. Vestibulum et turpis cursus.</p>

      <InputBoxes labels={['Faculty', 'Student']} />
      <br />
      
      <div>
        <h5>Parking Capacity</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elementum tortor at lorem faucibus condimentum. Etiam id bibendum nibh. Vestibulum et turpis cursus, tristique augue eget, malesuada massa. In felis.</p>

        <InputBoxes 
          labels={['Parking Area 1', 'Parking Area 2', 'Parking Area 3', 'In Campus Capacity']}/>
        <br/>
        <div>
          <h5>Create Parking Space</h5>
          <InputBoxes labels={['Name of Area' ,'Parking Capacity']} />
        </div>
      </div>
    </div>
  );
}

export default ParkingManagement;
