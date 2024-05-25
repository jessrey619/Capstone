import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Components/Main/main.css';
import CardsContainer from '../../Components/Card/CardsContainer'; 
import Slider from '../../Components/Slider/Slider';

function UserManagement() {
  const [userCounts, setUserCounts] = useState({
    totalUsers: 0,
    students: 0,
    employees: 0,
    faculty: 0,
  });

  useEffect(() => {
    axios.get('YOUR_API_ENDPOINT_HERE')
      .then(response => {
        const { totalUsers, students, employees, faculty } = response.data;
        setUserCounts({
          totalUsers,
          students,
          employees,
          faculty,
        });
      })
      .catch(error => {
        console.error('Error fetching user counts:', error);
      });
  }, []);

  const cardsData = [
    { title: 'Total Users', count: userCounts.totalUsers, iconClass: 'bi-people' },
    { title: 'Total Students', count: userCounts.students, iconClass: 'bi-person' },
    { title: 'Total Employees', count: userCounts.employees, iconClass: 'bi-person' },
    { title: 'Total Faculty', count: userCounts.faculty, iconClass: 'bi-person' },
  ];

  const tabs = [
    { label: 'Roles', value: '1'},
    { label: 'Permissions', value: '2'},
  ];

  return (
    <div>
      <div>
        <Slider tabs={tabs} />
        <CardsContainer cards={cardsData} />
      </div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Role</th>
            <th scope="col">Last Active</th>
            <th scope="col">Action</th>    
          </tr>
        </thead>
        <tbody>
            {/* {renderTableRows()} */}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
