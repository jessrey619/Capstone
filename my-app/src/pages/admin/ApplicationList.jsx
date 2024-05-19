import React, { useState, useEffect } from 'react';
import '../../Components/Main/main.css';
import PageTitle from '../../Components/Main/PageTitle';
import Header from '../../Components/AdminHeader/Header';
import SideBar from '../../Components/SideBar/SideBar';
import '../../Components/Table/table.css'
import Filter from '../../Components/Filter/Filter';

function ApplicationList() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const response = await fetch('http://localhost:8080/applicants/all');
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };


  const renderTableRows = () => {
    return applications.map(app => (
      <tr key={app.id}>
        <td>{app.id}</td>
        <td>{`${app.firstName} ${app.middleInitial} ${app.lastName}`}</td>
        <td>{app.is_staff ? 'Faculty' : 'Student'}</td>
        <td>New</td>
        <td>{app.gradeLevel}</td>
        <td>{app.idNumber}</td>
        <td>{app.contactNumber}</td>
        <td>{new Date(app.datesubmitted).toLocaleDateString()}</td>
        <td>{app.vechile_type === 0 ? '2' : '4'}</td>
        <td>
        <button className="action-btn view">
            <i className="bi bi-eye-fill text-primary"></i>
          </button>
          <button className="action-btn delete">
            <i className="bi bi-trash-fill text-danger"></i> 
          </button>
          <button className="action-btn check">
            <i className="bi bi-check-square text-success"></i> 
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <main id='main' className='main'>
      <Header />
      <SideBar />
      <PageTitle page="Application List" />
      <Filter/>
      <div className="table-container">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">User Type</th>
            <th scope="col">Application Type</th>
            <th scope="col">Grade/Year</th>
            <th scope="col">ID Number</th>
            <th scope="col">Contact Number</th>
            <th scope="col">Date Submitted</th>
            <th scope="col">Vehicle Type</th>
            <th scope="col">Action</th>    
          </tr>
        </thead>
        <tbody>
            {renderTableRows()}
        </tbody>
      </table>
      </div>
    </main>
  );
}

export default ApplicationList;
