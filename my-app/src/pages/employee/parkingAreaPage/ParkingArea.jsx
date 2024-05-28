import React, { useEffect, useState } from "react";
import axios from "axios";
import './ParkingArea.css';
import TheFooter from "../Components/Footer/Footer"
import SideBar from "../Components/SideBar/SideBar";
import Header from "../Components/Header/Header";

function ParkingArea() {
  const [parkingData, setParkingData] = useState([]);
  const [totalDailyLimit, setTotalDailyLimit] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8080/parking/active')
      .then(response => {
        setParkingData(response.data);
        
        const dailyLimit = response.data.reduce((acc, area) => acc + area.totalSpace, 0);
        setTotalDailyLimit(dailyLimit);
      })
      .catch(error => {
        console.error("Error on fetching the parking data:", error);
      });
  }, []);

      // I DON'T KNOW HOW TO DO THIS ?? BUTTON CAN OPEN AND CLOSE THE STATUS
    const toggleIsFull = async (id, currentStatus) => {
        const updatedStatus = !currentStatus;
        try {
          console.log(`Toggling isFull for id: ${id} to ${updatedStatus}`); // Debugging log
    
          const response = await axios.put(`http://localhost:8080/parking/${id}`, { isFull: updatedStatus });
          console.log('Update response:', response.data); // Debugging log
    
          setParkingData(prevData =>
            prevData.map(area =>
              area.id === id ? { ...area, isFull: updatedStatus } : area
            )
          );
        } catch (error) {
          console.error("There was an error updating the parking data!", error);
        }
      };

    return (
      <>
      <div className="bodyPA">
        <div>
        <Header/>
        <div className="side">
        <SideBar/>
        </div>
        <div>
        <img src="/background.png" alt="background" className="bgImagePA" /> 
        </div>
        <section className="top">
          <h1>Parking Areas</h1>
          <div className="limit">
            <p>Daily Limit:</p> <h2>{totalDailyLimit}</h2>
          </div>
          
        </section>

        <div className="wrap">
                {parkingData.map(area => (
                    <div className="box" key={area.id}>
                        <div className="box-top">
                            <h2 className="box-title">{area.name}</h2>
                            <img className="box-image" src="/parkingAreaIcon.svg" alt="Parking Area Icon" />
                            <div className="spaceP"><h3>Space:</h3> 
                            <p>{area.totalSpace}</p>
                            </div>
                            <h3 className="status">{area.isFull ? "Full" : "Open"}</h3>
                            <div className="inner">
                                <p>Total Space: {area.totalSpace}</p>
                                <p>Available Space: {area.availableSpace}</p>
                                <p>Occupied Space: {area.occupiedSpace}</p>
                            </div>
                        </div>
                        <button className= "ParkingAreaBtn" onClick={() => toggleIsFull(area.id, area.isFull)}>
                            {area.isFull ? "Open" : "Close"}
                        </button>
                    </div>
                ))}
            </div>

            <div>
            <TheFooter />
            </div>
        </div>
      </div>
    </>
    );
  
}

export default ParkingArea;
