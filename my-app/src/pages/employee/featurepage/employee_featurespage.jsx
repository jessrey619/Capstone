import React, { useEffect, useState } from 'react';
import Header from '../../../components/Navbar/EmployeeHeader'; 
import Footer from '../../../components/Navbar/UserFooter'; // Corrected import path for Footer
import employeebackgroundImage from '../../../assets/SIABackground.png'; // Corrected import path for backgroundImage
import '../../../components/Navbar/UserFooter.css'; // Corrected import path for Footer CSS
import './employee_featurespage.css';
import EmployeeSidebar from '../../../components/Navbar/EmployeeSidebar/employeeSidebar';
import { Link } from 'react-router-dom';
import axios from "axios";

const EmployeeFeaturePage = () => {
  
  const [employee, setEmployee] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/jwt/get-employee');
        setEmployee(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <Header />
        <EmployeeSidebar />
      <div className='employeefeaturespagebuttons-container'>
        <button className='fdashboardButton'>Dashboard</button>
        
        {employee.isVerifier?(<Link to="/orcr"><button className='verifyorcrdButton'>Verify OR/CR and License</button></Link>):(<></>)}

      </div>

      <div className='employeefeaturespagebuttons2-container'>
      {employee.isVerifier?(<Link to="/verifypay"><button className='verifyproofofpaymentButton'>Verify Proof Of Payment</button></Link>):(<></>)}

      {employee.isApprover?(<Link to="/approve"><button className='approveapplicationButton'>Approve Application </button></Link>):(<></>) }

      {/* PLACE THE LOG SHIT HERE */}
      
      </div>

      <div className='employeefeaturespage'>
        <img src={employeebackgroundImage} alt='employeebackgroundImage' className='employeebackgroundImage' />
      </div>
    
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <Footer />
      </div>
    </section>
  );
};

export default EmployeeFeaturePage;
