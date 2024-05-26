import React, { useState } from 'react';
import InputBoxes from '../../Components/InputBoxes/InputBoxes';
import CreateParkingCard from '../../Components/Card/CreateParkingCard';
import axios from 'axios'; 

function ParkingManagement() {
  const [showCreateParking, setShowCreateParking] = useState(false);

  const toggleCreateParking = () => {
    setShowCreateParking(!showCreateParking);
  };

  const handleTotalSpaceChange = (parkingAreaId, totalSpace) => {
    // Send request to update total_space
    axios.put(`/parking/${parkingAreaId}`, { totalSpace })
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  };

  const handleToggleActive = (parkingAreaId, isActive) => {
    // Send request to update is_active status
    axios.put(`/parking/${parkingAreaId}`, { isActive: !isActive })
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  };

  
  return (
    <div>
      <h5>Parking Capacity</h5>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elementum tortor at lorem faucibus condimentum. Etiam id bibendum nibh. Vestibulum et turpis cursus, tristique augue eget, malesuada massa. In felis.</p>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <InputBoxes 
            labels={['Parking Area 1', 'Parking Area 2', 'Parking Area 3', 'In Campus Capacity']}
            onTotalSpaceChange={handleTotalSpaceChange}
            onToggleActive={handleToggleActive}
          />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h5>Create Parking <button onClick={toggleCreateParking} className="plus-button">+</button></h5>
          {showCreateParking && <CreateParkingCard />}
        </div>
      </div>
    </div>
  );
}

export default ParkingManagement;
