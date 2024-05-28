import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../components/Table/table.css'

function RolesTab({ selectedCard }) {
  // Define state variables to store different types of users
  const [admins, setAdmins] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);

  // Function to fetch admins data from the server
  const getAdmins = async () => {
    try {
      const res = await axios.get("http://localhost:8080/jwt/getalladmin");
      const { data } = res;
      // Format retrieved admin data and update state
      const formattedAdmins = data.map(admin => ({
        name: `${admin.fname} ${admin.mname} ${admin.lname}`,
        role: admin.role
      }));
      setAdmins(formattedAdmins);
    } catch (error) {
      console.log("error", error);
    }
  };

  // Function to fetch employees data from the server
  const getEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:8080/jwt/getallemployee");
      const { data } = res;
      // Format retrieved employee data and update state
      const formattedEmployees = data.map(employee => ({
        name: `${employee.fname} ${employee.mname} ${employee.lname}`,
        role: employee.role
      }));
      setEmployees(formattedEmployees);
    } catch (error) {
      console.log("error", error);
    }
  };

  // Function to fetch all users data from the server
  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/jwt/getallusers");
      const { data } = res;

      // Separate users into students and faculty based on isStaff property
      const formattedStudents = [];
      const formattedFaculty = [];
      data.forEach(user => {
        const formattedUser = {
          name: `${user.fname} ${user.mname} ${user.lname}`,
          role: user.role
        };
        if (user.isStaff) {
          formattedFaculty.push(formattedUser);
        } else {
          formattedStudents.push(formattedUser);
        }
      });

      // Update state variables for students and faculty
      setStudents(formattedStudents);
      setFaculty(formattedFaculty);
    } catch (error) {
      console.log("error", error);
    }
  };

  // useEffect hook to fetch data when component mounts
  useEffect(() => {
    getAdmins();
    getUsers();
    getEmployees();
  }, []);

  // Function to render table rows based on selected card
  const renderTableRows = () => {
    let filteredUsers = [...admins, ...employees, ...students, ...faculty];
    
    // Apply filtering based on selected card
    if (selectedCard) {
      switch (selectedCard) {
        case 'Total Students':
          filteredUsers = students;
          break;
        case 'Total Employees':
          filteredUsers = employees;
          break;
        case 'Total Faculty':
          // Filter users with role "ADMIN" for Total Faculty card
          filteredUsers = admins.filter(user => user.role === 'ADMIN');
          break;
        default:
          break;
      }
    }

    // Render table rows based on filtered users
    return filteredUsers.map((user, index) => (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{user.name}</td>
        <td>{user.role}</td>
      </tr>
    ));
  };

  // Render the component
  return (
    <div className="table-container">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          {renderTableRows()}
        </tbody>
      </table>
    </div>
  );
}

export default RolesTab;
