import React, { useEffect, useState } from "react";
import './LogsEmployee.css';
import TheFooter from "../../../Components/Footer/Footer"
import axios from "axios";
import TheHeader from "../../../Components/Header/UserHeader";
import EmployeeSidebar from "../../../Components/Navbar/Employee_SideBar/employeeSidebar";



function LogsEmployee() {

    const [logs, setLogs] = useState([]);
    const [filterBy, setFilterBy] = useState('');
    const [twoWheels, setTwoWheels] = useState([]);
    const [fourWheels, setFourWheels] = useState([]);
    const [totalVehiclesInside, setTotalVehicles] = useState([]);
    const [parkingAreas, setParkingAreas] = useState([]);


    //AXIOS TO GET ALL THE GOOD SHIT
    useEffect(() => {
        axios.get('http://localhost:8080/logs/all')
          .then(response => {
            setLogs(response.data);
            console.log(response.data);
          })
          .catch(error => {
            console.error('Error fetching logs:', error);
          });

          axios.get('http://localhost:8080/logs/vehicle-types/count')
          .then(response => {
            const fourWheel = response.data.fourWheelCount;
            const twoWheel = response.data.otherCount;
            const total = fourWheel + twoWheel;
            setTwoWheels(twoWheel)
            setTotalVehicles(total);
            setFourWheels(fourWheel);
            
          })
          .catch(error => {
            console.error('Error fetching Counting:', error);
          });

          axios.get('http://localhost:8080/parking/active')
          .then(response => {
            setParkingAreas(response.data)
            
          })
          .catch(error => {
            console.error('Error fetching Counting:', error);
          });
      }, []);

    // const handleFilterChange = (event) => {
    //     setFilterBy(event.target.value);
    // };

    const filteredLogs = logs.filter(log => filterBy === '' || log.type === filterBy);

    return (
        <>
        <div>
        <TheHeader/>
        </div>
        <div className="LogsBody">
           
            <EmployeeSidebar/>
            
          <div>
             <img src="/background.png" alt="background" className="LogsBG" />
          <div className="liveContainer">

            <div className="total">

            <table className="liveCount">
                <thead>
                    <tr>
                        <th className="totalLive">Total</th>
                        <th className="totalLive">
                            {totalVehiclesInside}
                        </th>
                    </tr>
                </thead>
                        <tbody>
                            <tr className="liveContent">
                        <td>
                            Cars: {fourWheels}
                        </td>
                        <td>
                            Motors: {twoWheels}
                        </td>
                    </tr>
                </tbody>
            </table>

            <table className="secondCount">
         <thead>
            <tr className="totalDets">
            <th className="totalLive"></th>
            <th className="totalLive">Cars</th>
            <th className="totalLive">Motors</th>
            <th className="totalLive">Status</th>
        </tr>
        </thead>
        <tbody>
        {parkingAreas.map(area => (
        <tr key={area.id} className="secondCont">
            <td>{area.name}</td>
            <td>{area.numberOfCars}</td>
            <td>{area.numberOfMotorcycles}</td>
            <td>{area.isActive? 'Active': 'Inactive'}</td>
        </tr>
    ))}
    </tbody>
</table>
        </div>

            {/* <h2>
              Status: Available
            </h2> */}

          </div>
            <div>
                <h1 className="Btitle">Logs</h1>
                <div className="outer">
                    <div className="inner">
                         
                        {/* <div className="filterPart">
                        <label htmlFor="filter">Filter By:</label>
                        <select id="filter" name="filter" onChange={handleFilterChange}>
                            <option value="">All</option>
                            <option value="Parking">Parking</option>
                            <option value="OtherType">Other Type</option>
                        </select>
                        </div> */}
                        <div className="logs">
                    <table className="container">
    <thead>
        <tr>
            <th><h1>Log ID</h1></th>
            <th><h1>Type</h1></th>
            <th><h1>Sticker ID</h1></th>
            <th><h1>V-Type</h1></th>
            <th><h1>Color</h1></th>
            <th><h1>Plate No.</h1></th>
            <th><h1>Name</h1></th>
            <th><h1>Time In</h1></th>
            <th><h1>Time Out</h1></th>
        </tr>
    </thead>
    <tbody>
    {filteredLogs.map(log => (
    <tr key={log.id}>
        <td>{log.id}</td>
        <td>{log.isParking ? 'Parking' : 'Pickup/Drop off'}</td>
        <td>{log.stickerId}</td>
        <td>{log.isFourWheel ? 'Four Wheel': 'Two Wheel'}</td>
        <td>{log.color}</td>
        <td>{log.plateNo}</td>
        <td>{log.name}</td>
        <td>{log.timeIn}</td>
        <td>{log.timeOut===null? '---':log.timeOut}</td>
    </tr>
))}
    </tbody>
</table>
                        </div>
                    </div>

                </div>
            </div>
          </div>

        </div>
        <div>
        <TheFooter/>
        </div>

        </>
    );
}

export default LogsEmployee;
