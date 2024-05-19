import React, { useEffect, useState } from "react";
// import axios from "axios";
import '../css/ParkingArea.css';
import TheFooter from "../Components/Footer/Footer"
import SideBar from "../Components/SideBar/SideBar";
import Header from "../Components/Header/Header";

function ParkingArea() {
    const [disclaimer, setDisclaimer] = useState("55");
    const [status, setStatus] = useState("Close");

    //const [logs, setLogs] = useState([]);
    // const [twoWheels, setTwoWheels] = useState([]);
    // const [fourWheels, setFourWheels] = useState([]);
    // const [totalVehiclesInside, setTotalVehicles] = useState([]);
    // const [parkingAreas, setParkingAreas] = useState([]);


    // useEffect(() => {
    //     axios.get('http://localhost:8080/logs/all')
    //       .then(response => {
    //         setLogs(response.data);
    //         console.log(response.data);
    //       })
    //       .catch(error => {
    //         console.error('Error fetching logs:', error);
    //       });

    //       axios.get('http://localhost:8080/logs/vehicle-types/count')
    //       .then(response => {
    //         const fourWheel = response.data.fourWheelCount;
    //         const twoWheel = response.data.otherCount;
    //         const total = fourWheel + twoWheel;
    //         setTwoWheels(twoWheel)
    //         setTotalVehicles(total);
    //         setFourWheels(fourWheel);
            
    //       })
    //       .catch(error => {
    //         console.error('Error fetching Counting:', error);
    //       });

    //       axios.get('http://localhost:8080/parking/active')
    //       .then(response => {
    //         setParkingAreas(response.data)
            
    //       })
    //       .catch(error => {
    //         console.error('Error fetching Counting:', error);
    //       });
    //   }, []);


    return (
        <div>
        <Header/>
        <div className="side">
        <SideBar/>
        </div>
        <img src="/background.png" alt="background" className="backgroundImage" /> 

        <div class="wrap">
    
  <div class="box">
  <div className="box-top">
    <h1 className="box-title">Kelsie Meyer</h1>
        <img className="box-image" src="/parkingAreaIcon.svg" alt="Parking Area Num"/>
            <h3>Space:</h3>
                <p>{disclaimer}</p>
                <h3>{status}</h3>
  </div>
    <a href="#" class="button">Follow Mark</a>
  </div>
  <div class="box">
    <div class="box-top">
      <img class="box-image" src="https://images.unsplash.com/photo-1456885284447-7dd4bb8720bf?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYyMzMxNTQzNA&ixlib=rb-1.2.1&q=85" alt="Girl Eating Pizza"/>
      <div class="title-flex">
        <h3 class="box-title">Taylor Green</h3>
        <p class="user-follow-info">26 Projects</p>
      </div>
      <p class="description">Whipped steamed roast cream beans macchiato skinny grinder café. Iced grinder go mocha steamed grounds cultivar panna aroma.</p>
    </div>
    <a href="#" class="button">Follow Taylor</a>
  </div>
  <div class="box">
    <div class="box-top">
      <img class="box-image" src="https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYyMzMxNjA1MA&ixlib=rb-1.2.1&q=85" alt="Girl Eating Pizza"/>
      <div class="title-flex">
        <h3 class="box-title">Isaiah Jian</h3>
        <p class="user-follow-info">12 Projects</p>
      </div>
      <p class="description">Whipped steamed roast cream beans macchiato skinny grinder café. Iced grinder go mocha steamed grounds cultivar panna aroma.</p>
    </div>
    <a href="#" class="button">Follow Isaiah</a>
  </div>
</div>
{/* 
            <div className="box">
                <div className="box-top">
                    <h1 className="box-title">Kelsie Meyer</h1>
                    <img className="box-image" src="/parkingAreaIcon.svg" alt="Parking Area Num"/>
                    <h3>Space:</h3>
                    <p>{disclaimer}</p>
                    <h2>{status}</h2>
                </div>
                <div className="desc">
                    <h6 className="box-title">Kelsie Meyer</h6>
                    {/* CHANGE  */}
                    {/* <p>{disclaimer}</p>
                    <h6 className="user-follow-info">17 Projects</h6>
                    <p>{disclaimer}</p>
                    <h6 className="occupied">Whipped steamed.</h6>
                    <p>{disclaimer}</p>
                </div>
                <button className="toggleBtn" onClick={handleButtonClick}>
                    {status === "Closed" ? "OPEN" : "CLOSE"}
                </button>
            </div> */} 

       

        <TheFooter/>
    </div>
    );
}

export default ParkingArea;
