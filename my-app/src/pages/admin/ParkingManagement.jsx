import React, { useState, useEffect } from 'react';
import InputBoxes from '../../Components/InputBoxes/InputBoxes';
import CreateParkingCard from '../../Components/Card/CreateParkingCard';
import '../../Components/InputBoxes/inputBoxes.css';
import axios from 'axios'; 

const API_BASE_URL = 'http://localhost:8080/parking';

function ParkingManagement() {
  const [showCreateParking, setShowCreateParking] = useState(false);
  const [parkingAreas, setParkingAreas] = useState([]);

  useEffect(() => {
    // Fetch existing parking areas on component mount
    axios.get(`${API_BASE_URL}/active`)
      .then(response => setParkingAreas(response.data))
      .catch(error => console.error('Error fetching parking areas:', error));
  }, []);

  const toggleCreateParking = () => {
    setShowCreateParking(!showCreateParking);
  };

  const handleTotalSpaceChange = (parkingAreaId, totalSpace) => {
    setParkingAreas(prevAreas => prevAreas.map(area =>
      area.id === parkingAreaId ? { ...area, totalSpace } : area
    ));
  };

  const handleToggleActive = (parkingAreaId, isActive) => {
    axios.put(`${API_BASE_URL}/${parkingAreaId}`, { isActive: !isActive })
      .then(response => {
        console.log(response.data);
        // Update local state to reflect changes
        setParkingAreas(prevAreas => prevAreas.map(area => 
          area.id === parkingAreaId ? { ...area, isActive: !isActive } : area
        ));
      })
      .catch(error => console.error(error));
  };

  const handleSave = (parkingAreaId, totalSpace) => {
    const parkingArea = parkingAreas.find(area => area.id === parkingAreaId);
    axios.put(`${API_BASE_URL}/${parkingAreaId}`, { totalSpace, isActive: parkingArea.isActive })
      .then(response => {
        setParkingAreas(prevAreas => prevAreas.map(area =>
          area.id === parkingAreaId ? { ...area, totalSpace } : area
        ));
      })
      .catch(error => console.error('Error updating parking area:', error));
  };

  const handleCreateParking = (newParkingArea) => {
    axios.post(`${API_BASE_URL}/create`, newParkingArea)
      .then(response => {
        setParkingAreas([...parkingAreas, response.data]);
        setShowCreateParking(false);
      })
      .catch(error => console.error('Error creating parking area:', error));
  };

  return (
    <div>
      <h5>Parking Capacity</h5>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elementum tortor at lorem faucibus condimentum. Etiam id bibendum nibh. Vestibulum et turpis cursus, tristique augue eget, malesuada massa. In felis.</p>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }} className='input-container'>
          {parkingAreas.map(parkingArea => (
            <InputBoxes 
              key={parkingArea.id}
              labels={[parkingArea.name]}
              totalSpace={parkingArea.totalSpace}
              isActive={parkingArea.isActive}
              className="parking-capacity"
              parkingAreaId={parkingArea.id}
              onTotalSpaceChange={handleTotalSpaceChange}
              onToggleActive={handleToggleActive}
              onSave={handleSave}
            />
          ))}
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h5>Create Parking <button onClick={toggleCreateParking} className="plus-button">+</button></h5>
          {showCreateParking && <CreateParkingCard onCreate={handleCreateParking} />}
        </div>
      </div>
    </div>
  );
}

export default ParkingManagement;