import React, { useEffect, useState } from "react";
import './LogsEmployee.css';
import TheFooter from "../../../components/Footer/Footer"
import axios from "axios";
import EmployeeSidebar from "../../../components/Navbar/EmployeeSidebar/employeeSidebar";
import Header from "../../../components/Navbar/EmployeeHeader";
import { Input } from "@mui/material";
// import TheHeader from "../../../Components/Header/UserHeader";




function LogsEmployee() {

    const [logs, setLogs] = useState([]);
    const [filterBy, setFilterBy] = useState('');
    const [twoWheels, setTwoWheels] = useState([]);
    const [fourWheels, setFourWheels] = useState([]);
    const [totalVehiclesInside, setTotalVehicles] = useState([]);
    const [parkingAreas, setParkingAreas] = useState([]);
    const [stickerId, setStickerId] = useState('');
    const [loader, setLoader] = useState(true);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          handleSubmit();
        }
      };


      const handleSubmit = async () => {
        try {
          const response = await axios.post(`http://localhost:8080/logs/log-in`,null, {
            params: {
              stickerId: stickerId
            }
          });
          console.log('Response:', response.data);
          // Clear the input field after successful submission
          setStickerId('');
          setLoader(!loader)
          setStickerId('')
        } catch (error) {
          console.error('Error In Logs:', error);
          // Display error message to the user
          alert('Error in Logs: MUST WAIT 1 MINUTE FOR LOGOUT');
        }
      };


    //AXIOS TO GET ALL THE GOOD SHIT
    useEffect(() => {
        axios.get('http://localhost:8080/logs/all')
          .then(response => {
            setLogs(response.data);
            console.log(response.data);
            console.log("Logs",logs);
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
      }, [loader]);
    
    

    const filteredLogs = logs.filter(log => filterBy === '' || log.type === filterBy);

    return (
        <>
        <div>
        {/* <TheHeader/> */}
        <Header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }} />
        </div>

        <EmployeeSidebar style={{ position: 'fixed', top: '4rem', left: 0, bottom: 0, zIndex: 500 }} />
        <div className="LogsBody">
           
            
            
          <div>
             <img src="/background.png" alt="background" className="LogsBG" />
             <Input placeholder="Log StickerID Input"
                value={stickerId}
                onChange={(e)=>{setStickerId(e.target.value)}}
                onKeyDown={handleKeyPress}
                />
          <div className="liveContainer">

            
            <div className="totalContain">

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
                <div className="outerLogs">
                    <div className="innerLogs">
                         
                        {/* <div className="filterPart">
                        <label htmlFor="filter">Filter By:</label>
                        <select id="filter" name="filter" onChange={handleFilterChange}>
                            <option value="">All</option>
                            <option value="Parking">Parking</option>
                            <option value="OtherType">Other Type</option>
                        </select>
                        </div> */}
                        <div className="logs">
                    <table className="tb-container">
    <thead>
        <tr>
            <th><h1>Log ID</h1></th>
            <th><h1>Type</h1></th>
            <th><h1>Sticker ID</h1></th>
            <th><h1>V-Type</h1></th>
            <th><h1>Color</h1></th>
            <th><h1>Plate No.</h1></th>
            <th><h1>Name</h1></th>
            <th><h1>Active</h1></th>
            <th><h1>Time In</h1></th>
            <th><h1>Time Out</h1></th>
        </tr>
    </thead>
    <tbody>
    {filteredLogs
  .sort((a, b) => new Date(b.timeIn) - new Date(a.timeIn))
  .map(log => (
    <tr key={log.id}>
      <td>{log.id}</td>
      <td>{log.isParking ? 'Parking' : 'Pickup/Drop off'}</td>
      <td>{log.stickerId}</td>
      <td>{log.isFourWheel ? 'Four Wheel' : 'Two Wheel'}</td>
      <td>{log.color}</td>
      <td>{log.plateNo}</td>
      <td>{log.name}</td>
      <td style={{ color: log.active ? 'Green' : 'Red' }}>
          {log.active ? 'ACTIVE' : 'EXPIRED'}
      </td>
      <td>{log.timeIn ? new Date(log.timeIn).toLocaleString() : '---'}</td>
      <td>{log.timeOut ? new Date(log.timeOut).toLocaleString() : '---'}</td>
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
        {/* <TheFooter/> */}
        </div>

        </>
    );
}

export default LogsEmployee;
