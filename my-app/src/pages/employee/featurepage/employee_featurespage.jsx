import React from 'react';
import Header from '../../../Components/Navbar/EmployeeHeader/EmployeeHeader'; 
import TheFooter from '../../../Components/Footer/Footer'; // Corrected import path for Footer
import employeebackgroundImage from '../../../assets/SIABackground.png'; // Corrected import path for backgroundImage
import '../../../Components/Footer/Footer.css'; // Corrected import path for Footer CSS
import './employee_featurespage.css';
import EmployeeSidebar from '../../../Components/Navbar/Employee_SideBar/employeeSidebar';
import { Link } from 'react-router-dom';

const EmployeeFeaturePage = () => {
  
  return (
    <section>
      <Header />
        <EmployeeSidebar />
      <div className='employeefeaturespagebuttons-container'>
        <button className='fdashboardButton'>Dashboard</button>
        <Link to="/orcr"><button className='verifyorcrdButton'>Verify OR/CR and License</button></Link>
        
      </div>

      <div className='employeefeaturespagebuttons2-container'>
      <Link to="/verifypay"><button className='verifyproofofpaymentButton'>Verify Proof Of Payment</button></Link>
        <Link to="/approve"><button className='approveapplicationButton'>Approve Application </button></Link>
      </div>

      <div className='employeefeaturespage'>
        <img src={employeebackgroundImage} alt='employeebackgroundImage' className='employeebackgroundImage' />
      </div>
    
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <TheFooter />
      </div>
    </section>
  );
};

export default EmployeeFeaturePage;
